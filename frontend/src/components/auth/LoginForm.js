
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../utils/config';
import {jwtDecode} from 'jwt-decode';

const LoginForm = ({ setShowLoginForm}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password }, config);
            setLoading(false);
            console.log(data.token);
            // Save user info to local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            const user = jwtDecode(data.token);
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set("token", data.token, { expires: 7 })
            window.location.replace('/');
        } catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-3'></div>
                <div className=' col-6 form-container'>
                    <h3 className="text-center mb-5">Log into Your Account</h3>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={submitHandler}>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Email Address</label>
                    <input
                        type="email"
                                className='form-control custom-input'
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-medium'>Password</label>
                    <input
                        type="password"
                                className='form-control custom-input'
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                        <div className="text-center m-4">
                            <button type="submit" className="btn btn-dark custom-input-btn">Login</button>

                        </div>
            </form>
                    <div className="text-end">
                        <button className=" border-0 mt-4" onClick={() => setShowLoginForm (false)}>New Customer?</button>
            </div>
        </div>
                <div className='col-3'></div>
            </div>
        </div>
    );
};

export default LoginForm;
