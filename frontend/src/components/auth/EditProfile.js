import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../utils/config';
import Cookies from 'js-cookie';

const EditProfile = () => {
    const token = Cookies.get('token');
 
    const { user } = jwtDecode(token);
    console.log("User:", user)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            email: email,
            password:  password,
            confirmPassword:  confirmPassword,
        }

        const updateProfile = async () => {
            const response = await fetch(`${BASE_URL}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(userData)
            })

            if(response.ok) {
                window.alert("Profile updated successfully!");
                window.location.reload();
                Cookies.remove('token');
            } else {
                window.alert("Something went wrong!");
            }
        }
        updateProfile();
        
    
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-3'></div>
                <div className='col-6 form-container'>
                    <h3 className="text-center mb-2">Edit Profile</h3>
                    {message && <p className="text-danger">{message}</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {loading && <p>Loading...</p>}
                    <form onSubmit={submitHandler}>

                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Name</label>
                            <input
                                type="text" className='form-control custom-input'
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Email Address</label>
                            <input
                                type="email" className='form-control custom-input'
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Password</label>
                            <input
                                type="password" className='form-control custom-input'
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Confirm Password</label>
                            <input
                                type="password" className='form-control custom-input'
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-center m-4">
                            <button type="submit" className="btn btn-dark ">Update Profile</button>
                        </div>
                    </form>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    );
};

export default EditProfile;
