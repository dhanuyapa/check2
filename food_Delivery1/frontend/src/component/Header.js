import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './css/Header.css';
import image1 from './images/account.png';
import addcart from './images/addcart.png';

function Header({ userProfileImage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const [loggedInUserNIC, setLoggedInUserNIC] = useState('');

  useEffect(() => {
    const userNIC = localStorage.getItem('loggedInUserNIC');
    console.log('Header - User NIC:', userNIC);
    if (userNIC) {
      setLoggedInUserNIC(userNIC);
    }
  }, []);

  const handleViewProfile = () => {
    if (loggedInUserNIC) {
      // If user is logged in, navigate to the user profile page
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      // If user is not logged in, navigate to the login page
      navigate('/loginCus');
    }
  };

  return (
    <header>
      <div className="header-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="header-container">
            <center>
              <div className="header-brand">
                
                 <div>
                  <div className="addcart">

                 <img
                    src={addcart}
                 /> 
                    </div>
              </div>
              
          {userProfileImage ? (
            <img
              src={image1}
              alt="Profile"
              className="image1"
              onClick={handleViewProfile}
            />
          ) : (
            <img
              src={image1}
              alt="Profile"
              className="image1"
              onClick={handleViewProfile}
            />
          )}
        </div>
      
            </center>
            <div className="header-buttons">
              <Link className="btn btn-success" to="/add">
                Register
              </Link>
              <Link className="btn btn-success" to="/loginCus">
                Login
              </Link>
            </div>

            
            
          </div>
        </nav>
      </div>
      <div className="header-bottom">
        <div className="nav-header-bottom">
          <ul>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/hfetch"
                style={{ color: 'black', fontSize: '20px' }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/addd"
                style={{ color: 'black', fontSize: '15px' }}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/fetch"
                style={{ color: 'black', fontSize: '20px' }}
              >
                Downloads
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/news"
                style={{ color: 'black', fontSize: '20px' }}
              >
                News
              </Link>
            </li>
            <li>
              <div className="rounded-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </li>
          </ul>
        </div>
       
      </div>
    </header>
  );
}

export default Header;
