import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import { FaInstagramSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import Contact from './Contact';
import OurStory from './OurStory';


const Footer = () => {
    const { token } = useContext(AuthContext);  //to check if the user is logged inor not

    const [showContact, setShowContact] = useState(false);

    const handleShowContact = () => setShowContact(true);
    //const handleCloseContact = () => setShowContact(false);

    const handleShowModal = (e) => {
        e.preventDefault();
    }

    if (!token) return null; //hide footer if user is not logged in

    return (
       <>
    
            
            <Contact show={showContact} handleClose={setShowContact} />
            

            <footer className="bg-dark text-white text-center  mb-0 py-3">
              <div className='container'>
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <h5>Customer service</h5>
                            <a href='#' className='text-white d-block' onClick={handleShowModal} data-bs-toggle="modal" data-bs-target="#contactform">Contact us</a>
                            <a href='/my-account' className='text-white'>My Account</a>
                        </div>

                        <div className='col-md-4'>
                            <h5>Join us on</h5>
                            <div className='d-flex justify-content-center align-items-center'>
                                <p className='me-3 mb-0'><FaInstagramSquare size={24} /></p>
                                <p className='me-3 mb-0'><FaTwitterSquare size={24} /></p>
                                <p className='mb-0'><FaLinkedin size={24} /></p>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <h5>About us</h5>
                            <a href='/our-story' className='text-white'>Our Story</a>

                        </div>
                    </div>
                </div>
                <div className="container ">
                    <p className="mb-0">&copy; 2024 Bookstore. All rights reserved.</p>
                    <p className="mb-0">Contact us: info@hagestore.com</p>
                </div>
        </footer>
       </>

        
    );
};

export default Footer;
