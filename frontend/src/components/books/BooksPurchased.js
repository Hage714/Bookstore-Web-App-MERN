import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import AuthContext from '../../context/AuthContext';
import PurchasedBooksTable from './purchasing/PurchasedBooksTable';

function BooksPurchased() {
    const { token } = useContext(AuthContext);

    const { user } = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const [booksPurchased, setBooksPurchased] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch purchased books
    useEffect(() => {
        const getPurchasedBooks = async () => {
            const response = await fetch(`${BASE_URL}/purchasedbooks/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const data = await response.json();
            setBooksPurchased(data);
        }
        getPurchasedBooks();
    }, [token]);

    // Fetch available books
    const fetchAvailableBooks = async () => {
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

            setAvailableBooks(data);
        } catch (error) {
            setError('Failed to fetch available books.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailableBooks();
    }, [token]);


    return (
        <div className='row m-4'>
            {user.role === 'admin' && <PurchasedBooksTable booksPurchased={booksPurchased} />}
            {user.role === "customer" && <PurchasedBooksTable booksPurchased={booksPurchased} />}
            
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          
        </div>
    );
}

export default BooksPurchased;
