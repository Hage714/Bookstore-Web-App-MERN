import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import BooksList from './booklist/BooksList'
import { BASE_URL } from '../../utils/config'


const BooksLayout = () => {
    const [books, setBooks] = useState([]);
    const { token } = useContext(AuthContext);

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

    
  return (


      <div className='container mt-3'>

    <BooksList books={books}/>

         
         

      </div>
  )
}

export default BooksLayout
