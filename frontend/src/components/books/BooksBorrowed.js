import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../utils/config';
import AuthContext from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; 
import BorrowedBooksTable from './borrowing/BorrowedBooksTable';

function BooksBorrowed({ id }) {
    const { token } = useContext(AuthContext);

    const { user } = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const [booksBorrowed, setBooksBorrowed] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBorrowedBooks = async () => {
            const response = await fetch(`${BASE_URL}/borrowbooks/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const data = await response.json();
            setBooksBorrowed(data);
        }
        getBorrowedBooks();
    }, [token]);

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
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
     fetchAvailableBooks();
    }, [token]);
    //const booksBorrowed = JSON.parse(localStorage.getItem("booksBorrowed") || "[]");

    return (
        <div className='row m-4'>
            {user.role === 'admin' && <BorrowedBooksTable booksBorrowed={booksBorrowed} />}
            {user.role === "customer" && <>
                <BorrowedBooksTable booksBorrowed={booksBorrowed} />
            </>
            }
        </div>
    );
}

export default BooksBorrowed;
