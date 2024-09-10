import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import RegistrationForm from './components/auth/RegistrationForm';
import LoginForm from './components/auth/LoginForm';
import EditProfile from './components/auth/EditProfile';
import BooksLayout from './components/books/BooksLayout';
import BooksPurchased from './components/books/BooksPurchased';
import BooksBorrowed from './components/books/BooksBorrowed';
import BooksRequested from './components/books/BooksRequested';
import Navbar from './components/Navbar';
import Authenticate from './components/auth/Authenticate';
import AuthContext from './context/AuthContext';
import Books from './components/books/mostpurchased/Books';
import Footer from './components/footer/Footer';
import OurStory from './components/footer/OurStory';
import CartPage from './components/books/mostpurchased/CartPage';
import MyAccount from './components/myaccount/MyAccount';

function App() {
  const { token } = useContext(AuthContext);
  console.log("Token:", token);

  return (
    <>
      <Navbar />
      
      {token ? (

        <Router>
          <Routes>
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/books" exact element={<BooksLayout />} />
            <Route path="/purchased" exact element={<BooksPurchased />} />
            <Route path="/borrowed" exact element={<BooksBorrowed />} />
            <Route path="/requested" exact element={<BooksRequested />} />
            <Route path="/" exact element={<Books />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Routes>
        </Router>
      ) : (
        <Authenticate />
      )}
      <Footer />
    </>
    
  );
}

export default App;
