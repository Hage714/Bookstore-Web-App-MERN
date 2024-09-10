import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import AuthContext from '../../context/AuthContext';

function BooksRequested() {
    const { token } = useContext(AuthContext);

    const [bookTitle, setBookTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [booksRequested, setBooksRequested] = useState([]);

    

    //creating a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            book: bookTitle,
            quantity: quantity,
        }
        const requestBook = async() => {
            await axios.post(`${BASE_URL}/requestedbooks/`, bookData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            setMessage("Book request submitted successfully!");
            setBookTitle(null);
            setQuantity(null);
            alert("Book request submitted successfully!");
            window.location.reload();
        }
        requestBook();
    }

    useEffect(() => {
        const fetchBooksRequested = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${BASE_URL}/requestedbooks/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });
                const data = response.data;
                console.log(data);
                setBooksRequested(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooksRequested();
    }, [token])

    return (
        <div className='row m-4'>
                <div className='col-4'>
                    <h3 className="text-center mb-4">Request a Book</h3>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='form-group' mb-3>

                            <label className='form-label fw-medium'>Book Title:</label>
                            <input
                                type="text" className='form-control custom-input'

                                id="bookTitle"
                                value={bookTitle}
                                onChange={(e) => setBookTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group' mb-3>

                            <label className='form-label fw-medium'>Quantity:</label>
                            <input
                            type="number" className='form-control custom-input'

                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="text-center m-4">

                            <button type="submit" className="btn btn-dark" disabled={isLoading} >
                            {isLoading ? 'Submitting...' : 'Request Book'}
                        </button>
                        

                        </div>

                    </form>
                </div>

            <div className='booklist col-8'>
                <h3 className="text-center mb-3">Your Request History</h3>
                {isLoading && <p>Loading request history...</p>}
                {error && <p>Error fetching request history: {error}</p>}
                {booksRequested.length > 0 ? (
                    <table className="table table-md table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>

                                <th>Book Title</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {booksRequested.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{index + 1}</td>

                                    <td>{request.book}</td>
                                    <td>{request.quantity}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You have no past requests.</p>
                )}
            </div>

            </div>

    );
}

export default BooksRequested;
