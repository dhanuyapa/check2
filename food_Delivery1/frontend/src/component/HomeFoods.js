import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderMain from "./Header";

function HomeFoods() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8070/Food/fetch');
                setFoods(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setLoading(false); // Update loading state even on error
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HeaderMain />
            <h2>All Foods</h2>
            <ul>
                {foods.map((food) => (
                    <li key={food._id}>
                        <h3>{food.foodname}</h3>
                        <p>Price: {food.price}</p>
                        <p>Description: {food.description}</p>
                        <button >Edit food</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeFoods;