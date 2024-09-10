import React, { useState, useEffect, useContext } from 'react'
import { BASE_URL } from '../../../utils/config';
import AuthContext from '../../../context/AuthContext';

const EditBooks = ({ id }) => {
    const { token } = useContext(AuthContext);

    const [bookTitle, setBookTitle] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            const response = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const data = await response.json();
            setBookTitle(data.title);
            setBookAuthor(data.author);
            setQuantity(data.quantity);
            setPrice(data.price);
            console.log(data);
        }
        if (id) {
            getBook();
        }

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            title: bookTitle,
            author: bookAuthor,
            quantity: quantity,
            price: price,
        }

        const editBook = async () => {
            const response = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(bookData)
            });
            if (response.ok) {
                alert("Book updated successfully!");
                window.location.reload(); 
            }
            else {
                alert("Failed to update book!");
            }
        }
        editBook();
    } 

    return (
        <div className="modal fade" id="editBooksModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <form onSubmit={handleSubmit}>
                            <div className='form-group' mb-3>
                                <label className='form-label'>Title:</label>
                                <input
                                    type="text" className='form-control'

                                    id="bookTitle"
                                    value={bookTitle}
                                    onChange={(e) => setBookTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group' mb-3>
                                <label className='form-label'>Author:</label>
                                <input
                                    type="text" className='form-control'
                                    id="bookAuthor"
                                    value={bookAuthor}
                                    onChange={(e) => setBookAuthor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Quantity:</label>
                                <input
                                    type="number" className='form-control'
                                    id="bookQuantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Price:</label>
                                <input
                                    type="number" className='form-control'
                                    id="bookPrice"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-center mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Edit book
                                </button>
                            </div>


                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditBooks
