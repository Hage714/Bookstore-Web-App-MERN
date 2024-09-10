import React, { useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../utils/config';
import Cookies from 'js-cookie';

const UserProfile = () => {

    const token = Cookies.get('token');
    const { user } = jwtDecode(token);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        
        const fetchUserData = async () => {
            const response = await fetch(`${BASE_URL}/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            })

            if (response.ok) {
                console.log("Profile fetched successfully!");
                //window.location.reload();
            } else {
                console.log("Something went wrong!");
            }
        }
        fetchUserData();
    }, [token]);
   
    return (
        <div className="profile">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserProfile;
