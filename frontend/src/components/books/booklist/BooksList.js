import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import AuthContext from '../../../context/AuthContext';
import { MdDelete, MdEdit } from "react-icons/md";
import EditBooks from './EditBooks';
import DeleteBooks from './DeleteBooks';

const BooksList = ({ books }) => {
    const { token } = useContext(AuthContext);

    const [bookTitle, setBookTitle] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [booksList, setBooksList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSelectedBook = (id) => {
        setSelectedBook(id);
    }

    //creating a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

            let formData = new FormData();
            formData.append('title', bookTitle);
            formData.append('author', bookAuthor);
            formData.append('quantity', quantity);
            formData.append('price', price);
            formData.append('image', image);
    
        const bookList = async () => {
            const response = await fetch(`${BASE_URL}/books/`,{
                method: 'POST',
                headers: {
                    'Accept': '*',
                    'Authorization': `${token}`
                },
                body: formData
            });
            alert("Book added successfully!");
            window.location.reload();
        }
        bookList();
    }

    useEffect(() => {
        const fetchBooksList = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${BASE_URL}/books/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });
                const data = response.data;
                console.log(data);
                setBooksList(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooksList();
    }, [token])

    return (
        <div className='row'>
            <div className='col-lg-4 col-md-6 mx-auto' >
                <h3 className="text-center mb-4" >Add a book</h3 >

                <form onSubmit={handleSubmit}>
                    <div className='form-group' mb-3>
                        <label className='form-label fw-medium'>Title:</label>
                        <input
                            type="text" className='form-control custom-input'

                            id="bookTitle"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group' mb-3>
                        <label className='form-label fw-medium'>Author:</label>
                        <input
                            type="text" className='form-control custom-input'
                            id="bookAuthor"
                            value={bookAuthor}
                            onChange={(e) => setBookAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group' mb-3>
                        <label className='form-label fw-medium'>Quantity:</label>
                        <input
                            type="number" className='form-control custom-input'
                            id="bookquantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group' mb-3>
                        <label className='form-label fw-medium'>Price:</label>
                        <input
                            type="number" className='form-control custom-input'
                            id="bookPrice"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group' mb-3>
                        <label className='form-label fw-medium'>Image:</label>
                        <input
                            type="file" className='form-control custom-input'
                            id="image"
                        name='image'
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="text-center m-4">
                        <button type="submit" className="btn btn-dark" disabled={isLoading} >
                            {isLoading ? 'Submitting...' : 'Add a book'}
                        </button>
                    </div>

                </form>
            </div>

            <EditBooks id={selectedBook} />
            <DeleteBooks id={selectedBook} />
            <div className='col-lg-8 col-md-6 mx-auto booklist'>
                <h2 className='text-center'>Book List</h2>
                <table className="table table-md table-responsive table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((list, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{list.title}</td>
                                <td>{list.author}</td>
                                <td>{list.quantity}</td>
                                <td>{list.price}</td>
                                <td><MdDelete onClick={() => handleSelectedBook(list._id)} data-bs-toggle="modal" data-bs-target="#deleteBooksModal" style={{ color: 'maroon', fontSize: '20px' }} /></td>
                                <td><MdEdit onClick={() => handleSelectedBook(list._id)} data-bs-toggle="modal" data-bs-target="#editBooksModal" style={{ color: 'darkblue', fontSize: '20px' }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default BooksList
