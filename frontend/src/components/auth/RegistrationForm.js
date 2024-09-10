import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config'; 


const RegistrationForm = ({ setShowLoginForm }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const { data } = await axios.post(`${BASE_URL}/auth/register`, { name, email, password, role }, config);
                setLoading(false);

                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.replace('/');
            } catch (error) {
                setLoading(false);
                setError(error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message);
                window.alert(error.message)
            }
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-3'></div>
                <div className='col-6 form-container'>
                    <h3 className="text-center">Create an account</h3>
                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                    {loading && <p>Loading...</p>}
                    <form onSubmit={submitHandler}>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Name</label>
                            <input
                                type="text"
                                className='form-control custom-input'
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} required
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Email</label>
                            <input
                                type="email"
                                className='form-control custom-input'

                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select custom-input"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">select</option>

                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className='form-group mb-3'>
                            <label className='form-label'>Password</label>
                            <input
                                type="password"
                                className='form-control custom-input'

                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>

                        <div className='form-group mb-3'>
                            <label className='form-label'>Confirm Password</label>
                            <input type='password' className='form-control custom-input' placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>

                        <div className="text-center m-4">
                            <button type="submit" className="btn btn-dark custom-input-btn">Register</button>

                        </div>
                    </form>
                    <div className="text-end">
                        <button className="border-0" onClick={() => setShowLoginForm(true)}>Have an account?</button>
                    </div>
                </div>
                <div className='col-3'></div>
            </div>
       </div>
    );
};

export default RegistrationForm;


