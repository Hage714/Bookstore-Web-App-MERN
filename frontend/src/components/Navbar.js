import React, { useContext } from "react";
import { BASE_URL } from '../utils/config';
import AuthContext from '../context/AuthContext';
import Cookies from "js-cookie";  //for the clear-cookie
import { IoMdCart } from "react-icons/io"; 
import { IoLogOut } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

const Navbar = () => {
    const { token } = useContext(AuthContext);  //to check if the user is logged inor not
    
    //to clear everything once you click on logout
    const handleLogout = () => {
Cookies.remove("token");
window.location.reload();
    }

    if (!token) return null; //hide navbar if user is not logged in

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid d-flex justify-content-between">
                    <img className="img-fluid" src="https://cdn.dribbble.com/userupload/6810642/file/original-45a54e0571ae13ce154f565f49615607.png?resize=400x0"></img>
                    <a className="navbar-brand text-white fw-bold fs-3" href="/">HAGE'S STORE</a>
                    
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                           
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold  fs-5 hover-underline" href="/books">BOOKS LIST</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold  fs-5 hover-underline" href="/purchased">PURCHASED</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold  fs-5 hover-underline" href="/borrowed">BORROWED</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold  fs-5 hover-underline" href="/requested">REQUESTED</a>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="navbar-nav">
                        {token && (
                            <>
                                <a className="nav-link text-white fw-semibold fs-5 hover-underline" href="/profile"><FaUserEdit size={24} /></a>
                                <a className="nav-link text-white fw-semibold fs-5 hover-underline" href="/cart"><IoMdCart size={24} /></a>
                                <button className="nav-link text-white fw-semibold btn btn-link fs-5 hover-underline" onClick={handleLogout}><IoLogOut size={24} /></button>
                            </>
                        )}
                        {!token && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white fw-bold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/register">Register</a></li>
                                    <li><a className="dropdown-item" href="/login">Login</a></li>
                                </ul>
                            </li>
                        )}
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Navbar;
