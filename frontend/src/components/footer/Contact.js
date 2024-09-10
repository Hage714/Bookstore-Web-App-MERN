import React, { useState, useContext } from 'react'
import { BASE_URL } from '../../utils/config';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';

const Contact = ({ show, setShowContact}) => {
  const { token } = useContext(AuthContext);

  const [yourName, setYourName] = useState(null);
  const [yourEmailAddress, setYourEmailAddress] = useState(null);
  const [yourMessage, setYourMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name: yourName,
      emailAddress: yourEmailAddress,
      message: yourMessage,
    };

    // Check if token is valid
    try {
      const response = await fetch(`${BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`

        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert('Contact submitted successfully');
        window.location.reload();
        //setShowContact(false); // Close the modal

      } else {
        const errorText = await response.text();
        console.error('Error submitting contact:', errorText);
        alert('Error submitting contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="modal fade" id="contactform" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Contact Us</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          
            <form onSubmit={handleSubmit}>
              <div className='form-group' mb-3>
                <label className='form-label'>Your name:</label>
                <input
                  type="text" className='form-control'

                  id="yourName"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  required
                />
              </div>

              <div className='form-group' mb-3>
                <label className='form-label'>Your email address:</label>
                <input
                  type="text" className='form-control'
                  id="yourEmailAddress"
                  value={yourEmailAddress}
                  onChange={(e) => setYourEmailAddress(e.target.value)}
                  required
                />
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Your message:</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" value={yourMessage} onChange={(e) => setYourMessage(e.target.value)}
 rows="3"></textarea>
              </div>
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-dark"  >
                  Contact us
                </button>
              </div>


            </form>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Contact
 