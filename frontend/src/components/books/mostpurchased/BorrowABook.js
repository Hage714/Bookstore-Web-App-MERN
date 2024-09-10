import React, { useState, useContext } from 'react';
import { BASE_URL } from '../../../utils/config';
import AuthContext from '../../../context/AuthContext'; 
import axios from 'axios';

const BorrowABook = ({ id }) => {
    const { token } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const [borrowedDate, setBorrowedDate] = useState(null);
    const [returnDate, setReturnDate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //creating a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const borrowedData = {
            book: id,
            borrowedDate: borrowedDate,
            returnedDate: returnDate,
        }
console.log(borrowedData);

        try {
            setIsLoading(true);
            await axios.post(`${BASE_URL}/borrowbooks/`, borrowedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            alert("Book borrowed successfully!");
            window.location.reload();  // Reload the page to reflect the changes

        } catch (err) {
            setError("Failed to borrow the book. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="modal fade" id="borrowAbookModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Borrow a Book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">


                            <form onSubmit={handleSubmit}>

                                <div className='mb-3'>

                                    <label className='form-label fw-medium'>Borrowed Date:</label>
                                    <input
                                        type="date" className='form-control '

                                        id="bookDate"
                                        value={borrowedDate}
                                        onChange={(e) => setBorrowedDate(e.target.value)}
                                        required
                                    />
                                </div>

                            <div className='mb-3'>

                                <label className='form-label fw-medium'>Return Date:</label>
                                <input
                                    type="date" className='form-control '

                                    id="bookDate"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    required
                                />
                            </div>


                                <div className="text-center m-4">
                                    <button type="submit" className="btn btn-dark" disabled={isLoading} >
                                        {isLoading ? 'Submitting...' : 'Borrow Book'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
     



    )
}

export default BorrowABook
