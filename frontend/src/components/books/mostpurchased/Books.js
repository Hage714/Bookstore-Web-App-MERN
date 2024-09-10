import React, {useState, useEffect, useContext} from 'react'
import BooksCard from './BooksCard' 
import { BASE_URL } from '../../../utils/config';
import AuthContext from "../../../context/AuthContext" 


const Books = () => {

    const [cartItems, setCartItems] = useState([]);
    const [books, setBooks] = useState([]);
    const { token } = useContext(AuthContext);

    const addToCart = (book, quantity) => {
        setCartItems([...cartItems, { ...book, quantity }]);
    };

    const getBooks = async () => {
        const response = await fetch(`${BASE_URL}/books`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            method: "GET"
        })
        const data = await response.json();
        console.log(data);

        setBooks(data);
    }

    useEffect(() => {
        getBooks();
    }, [0]);

    //console.log(mostpurchasedbooks);
  return (

    
      <div className="container mt-4">
          <h2 className="mb-3 text-center">Books in store</h2>

          <div className="row">
              {books.map((book) => {
                  return <BooksCard key={book._id} book={book} addToCart={addToCart} />
                
              })}
          </div>

      </div>
  )
}

export default Books
