import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./css_yapa/userprofile.css";

function UserProfile() {
  const [loggedInUserNIC, setLoggedInUserNIC] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = React.createRef();

  useEffect(() => {
    const userNIC = localStorage.getItem("loggedInUserNIC");
    console.log("UserProfile - User NIC:", userNIC);
    if (userNIC) {
      setLoggedInUserNIC(userNIC);
      fetchUserProfile(userNIC);
    }

    // Set up the event listener for page unload
    const handleUnload = () => {
      console.log("Page is about to unload. Clearing localStorage...");
      localStorage.removeItem("loggedInUserNIC");
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    const savedImage = localStorage.getItem(`userProfileImage_${loggedInUserNIC}`);
    console.log('Saved Image:', savedImage);
    if (savedImage) {
      console.log('Setting selected image from localStorage');
      setSelectedImage(savedImage);
      setShowRemoveButton(true);
    } else {
      console.log('No saved image found in localStorage');
    }
  }, [loggedInUserNIC]);

  const fetchUserProfile = async (nic) => {
    try {
      const loggedInUserNIC = nic.trim();
      console.log("Fetching user details for NIC:", loggedInUserNIC);
      const response = await axios.get(
        `http://localhost:8070/customers/getUser/${loggedInUserNIC}`
      );
      console.log("User details response:", response.data);
      const { status, customer } = response.data;

      if (status === "Customer fetched") {
        setUserDetails(customer);
      } else {
        console.error(`Error: ${status}`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleEditProfile = () => {
    navigate(`/Edit/${loggedInUserNIC}`);
  };

  const handleSettings = () => {
    navigate(`/DeleteAccount`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem(`userProfileImage_${loggedInUserNIC}`, reader.result);
      setSelectedImageFile(file);
      setShowSaveButton(true);
      setShowRemoveButton(true);
    };
  };

  const removeProfileImage = () => {
    localStorage.removeItem(`userProfileImage_${loggedInUserNIC}`);
    setSelectedImage(null);
    setSelectedImageFile(null);
    setShowSaveButton(false);
    setShowRemoveButton(false);
  };

  const openImageSelector = () => {
    fileInputRef.current.click();
  };

  const updateProfileImage = async () => {
    if (!selectedImageFile) {
      console.error('No image selected for upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profileImage', selectedImageFile);

      const response = await axios.post(`http://localhost:8070/customers/uploadProfileImage/${loggedInUserNIC}`, formData);

      console.log('Image uploaded successfully', response.data.imageUrl);
      const uploadedImageUrl = response.data.imageUrl;

      // Save the uploaded photo URL in local storage
      localStorage.setItem(`userProfileImage_${loggedInUserNIC}`, uploadedImageUrl);
      setSelectedImage(uploadedImageUrl);
      setShowSaveButton(false);
      setShowRemoveButton(true);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  console.log('Selected Image:', selectedImage);

  return (
    <div>
      <Header />
      <div className="user">
        <h1>User Profile</h1>
        {loggedInUserNIC ? (
          <>
            <div className="profile-info">
              <div className="profile-photo-container">
                {selectedImage && <img className="profile-photo" src={selectedImage} alt="Profile" />}
              </div>
              <div className="profile-buttons">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <button onClick={openImageSelector}>Change Profile Image</button>
                {/*{showSaveButton && <button onClick={updateProfileImage}>Save Image</button>}*/}
                {showRemoveButton && <button onClick={removeProfileImage}>Remove Image</button>}
              </div>
              <table className="profile-table">
                <tbody>
                  <tr>
                    <td className="title">First Name</td>
                    <td>{userDetails.fname}</td>
                  </tr>
                  <tr>
                    <td className="title">Last Name</td>
                    <td>{userDetails.lname}</td>
                  </tr>
                  <tr>
                    <td className="title">NIC</td>
                    <td>{userDetails.nic}</td>
                  </tr>
                  <tr>
                    <td className="title">Phone</td>
                    <td>{userDetails.phone}</td>
                  </tr>
                  <tr>
                    <td className="title">Email</td>
                    <td>{userDetails.email}</td>
                  </tr>
                  <tr>
                    <td className="title">No</td>
                    <td>{userDetails.no}</td>
                  </tr>
                  <tr>
                    <td className="title">Street 1</td>
                    <td>{userDetails.street1}</td>
                  </tr>
                  <tr>
                    <td className="title">Street 2</td>
                    <td>{userDetails.street2}</td>
                  </tr>
                  <tr>
                    <td className="title">City</td>
                    <td>{userDetails.city}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="editbutton">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleSettings} className="delete">Delete</button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
