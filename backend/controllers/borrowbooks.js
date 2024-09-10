const Borrowbook = require('../models/borrowbooks');
const Customer = require('../models/customers');

const borrowBook = async (req, res) => {
    try {
        const { book, borrowedDate} = req.body;
        const customer = await Customer.findOne({ user: req.user.id });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' }); 
        }

        // Create a new borrowbook document
        const newBorrowbook = new Borrowbook({
            book,
            borrowedDate,
            customer: customer._id
        });

        // Save the document to the database
        const savedBorrowbook = await newBorrowbook.save();
        res.status(201).json(savedBorrowbook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while borrowing the book' });
    }
};

// to get all borrowed books
const getBorrowedBooks = async (req, res) => {
    try {
        console.log({ user: req.user })
        if (req.user.role === 'admin') {
            const borrowedBooks = await Borrowbook.find({}).populate("book");
            res.json(borrowedBooks);
        } else {
            const customer = await Customer.findOne({ user: req.user.id });
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            const borrowedBooks = await Borrowbook.find({customer:customer._id}).populate("book");
            res.status(200).json(borrowedBooks);
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching borrowed books' });
    }
};

// return a borrowed book
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { returnedDate, status } = req.body;

        // Update the borrowbook document
        const updatedBorrowbook = await Borrowbook.findByIdAndUpdate(id, { returnedDate, status }, { new: true });

        if (!updatedBorrowbook) {
            return res.status(404).json({ error: 'Borrowed book not found' });
        }

        res.status(200).json(updatedBorrowbook);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while returning the book' });
    }
};

module.exports = {
    borrowBook,
    getBorrowedBooks,
    returnBook
};
