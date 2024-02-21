import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderMain from "./Header";

function Addfoods(){

    const [fname, setFname] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        console.log('sendData function called');

        const newFood = {
            foodname: fname,
            price: price,
            description: description
        };

        axios.post('http://localhost:8070/Food/addd', newFood)
            .then(response => {
                console.log(response.data);
                alert('successfully added')
                navigate('/'); // Navigate to the homepage or any other desired route
            })
            .catch(error => {
                console.error('Error adding food:', error);
                alert('erroradded')
                // Handle error, show error message to the user, etc.
            });
    }

    return (
        <div>
             <HeaderMain />
            <form onSubmit={sendData}>
            <label>
    Food Name:
    <input
        type="text"
        id="fname"
        name="fname"
        title="Enter only letters"
        required
        placeholder="Enter Food"
        value={fname}
        maxLength={10}
        onChange={(e) => {
            const input = e.target.value;
            if (/^[A-Za-z]*$/.test(input)) {
                setFname(input.slice(0, 10)); // Limit to 10 characters
            }
        }}
        onKeyPress={(e) => {
            const charCode = e.charCode;
            if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                e.preventDefault();
            }
        }}
    />
</label>

                <br />
                
                <label>
    Price:
    <input
        type="text"
        value={price}
        placeholder="Enter Food Price"
        onChange={(e) => {
            const input = e.target.value;
            // Allow only numbers and a decimal point
            const regex = /^\d*\.?\d*$/;
            if (regex.test(input)) {
                setPrice(input);
            }
        }}
    />
</label>


                <br />
                <label>
    Description:
    <textarea
        value={description}
        placeholder="Enter Description"
        onChange={(e) => {
            const input = e.target.value;
            // Allow only letters
            const regex = /^[A-Za-z\s]*$/;
            if (regex.test(input)) {
                setDescription(input);
            }
        }}
    />
</label>

                <br />
                <button type="submit">Add Food</button>
            </form>
        </div>
    );
}

export default Addfoods;
