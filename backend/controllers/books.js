const Book = require('../models/books'); 

const addBook = async (req, res) => {
    const { title, author, quantity, price } = req.body;
    const image = req.file.filename


    try {
        const newBook = new Book({ title, author, quantity, price, image });
        await newBook.save();
        res.json(newBook);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 
const getBookById = async (req, res) => {

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const editBook = async (req, res) => {
    const { title, author, quantity, price} = req.body;

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.quantity = quantity || book.quantity;
        book.price = price || book.price;  

        await book.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.json({ msg: 'Book removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const viewBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    addBook,
    getBookById,
    editBook,
    deleteBook,
    viewBooks
}