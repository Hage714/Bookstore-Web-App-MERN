import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSwatchbook } from "react-icons/fa";
import { BASE_URL } from '../../../utils/config'; 
import BorrowABook from './BorrowABook';

const BooksCard = ({ book }) => {
    const [showCartForm, setShowCartForm] = useState(false);
    const [inCart, setInCart] = useState(false);
    const navigate = useNavigate();

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleSelectedBook = (id, title) => {
        setSelectedBookId(id);
        setSelectedBook(title);
    };

    useEffect(() => {
        // Check if the item is already in the cart when the component mounts
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = existingCartItems.find(item => item.id === book._id);
        if (item) {
            setInCart(true);
        }
    }, [book._id]);

const handleShowCartForm = () => {
        setShowCartForm(!showCartForm);
    }
    const handleAddToCart = () => {
        const cartItem = {
            id:book._id,
            title:book.title,
            price:book.price,
            quantity:1,
        }
console.log(cartItem);
const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const item = existingCartItems.find(item => item.id === book._id);
console.log(item);
console.log(existingCartItems);
if (item) {
const updatedItems = existingCartItems.map(item => {
    if (item.id === book._id) {
        return {...item, quantity: item.quantity + 1};
    }
    return item;
});

localStorage.setItem('cartItems', JSON.stringify(updatedItems));
} else {
    localStorage.setItem('cartItems', JSON.stringify([...existingCartItems, cartItem]));
}
        setInCart(true); // Update the state to reflect that the item is in the cart
        window.location.reload();
    };
const handleViewCart = () => {
    navigate('/cart'); // Navigate to the cart page
};
    return (
    <>
            <BorrowABook id={selectedBookId} title={selectedBook} /> 

        <div className='col-lg-4 col-sm-6 mb-3 mb-sm-0 mb-lg-2' key={book._id}>
            <div className='card'>
                <img src={`${BASE_URL}/images/${book?.image}`} className="card-img-top standard-image" alt={book.title} />
                < div className='card-body '>
                    <h5 className='card-title'>{book.title}</h5>
                      
                        <p className='card-text'>Price: <strong className='fs-5'>{book.price}</strong></p>
                        <p>Quantity: <strong className='fs-5'>{book.quantity}</strong></p>
                      
        <div className='d-flex justify-content-between align-items-center mt-3'>
                        <div className='buttons'>
                            {inCart ? (
                                <button className='btn-view' onClick={handleViewCart}>View cart</button>
                            ) : (
                                <button className='btn-add' onClick={handleAddToCart}>Add to cart</button>
                            )}
                        </div>
                        <div className='icons d-flex '>
                                <FaSwatchbook size={24} onClick={() => handleSelectedBook(book._id, book.title)} data-bs-toggle="modal" data-bs-target="#borrowAbookModal" className='ms-2 text-emphasis hover' style={{ color: 'darkblue' }} />
                    </div>
                    
        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BooksCard
