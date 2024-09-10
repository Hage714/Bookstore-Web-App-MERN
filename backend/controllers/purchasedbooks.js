const Purchasedbook = require('../models/purchasedbooks');
const Customer = require('../models/customers');
const Book = require('../models/books');

const addPurchasedBook = async (req, res) => {
    try {
        const { book, quantity, price, purchaseDate } = req.body;
        const customer = await Customer.findOne({ user: req.user.id });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
         }

        const purchasedBook = await Book.findById({ _id:book });
        if (!purchasedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if (quantity > purchasedBook.quantity ) {
            return res.status(400).json({ error: 'Not enough books in stock' });
        }
        purchasedBook.quantity = purchasedBook.quantity - quantity;
        await purchasedBook.save();
            

        // Create a new purchased book document
        const newPurchasedBook = new Purchasedbook({
            book,
            quantity,
            price,
            purchaseDate,
            customer: customer._id
        });
        
        // Save the document to the database
        const savedPurchasedBook = await newPurchasedBook.save();
        res.status(201).json(savedPurchasedBook);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the purchased book' });
    }
};

const getPurchasedBooks = async (req, res) => {
    try {
        console.log({ user: req.user })
        if (req.user.role === 'admin') {
            const purchasedBooks = await Purchasedbook.find({}).populate("book");
            res.json(purchasedBooks);
        } else {
            const customer = await Customer.findOne({ user: req.user.id });
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            const purchasedBooks = await Purchasedbook.find({customer:customer._id}).populate ("book");
            res.status(200).json(purchasedBooks);
    }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching purchased books' });
    }
};

const updatePurchasedBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { bookTitle, author, price, purchaseDate } = req.body;

        // Update the purchased book document
        const updatedPurchasedBook = await Purchasedbook.findByIdAndUpdate(id, { bookTitle, author, price, purchaseDate }, { new: true });

        if (!updatedPurchasedBook) {
            return res.status(404).json({ error: 'Purchased book not found' });
        }

        res.status(200).json(updatedPurchasedBook);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the purchased book' });
    }
};

const deletePurchasedBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the purchased book document
        const deletedPurchasedBook = await Purchasedbook.findByIdAndDelete(id);

        if (!deletedPurchasedBook) {
            return res.status(404).json({ error: 'Purchased book not found' });
        }

        res.status(200).json({ message: 'Purchased book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the purchased book' });
    }
};

module.exports = {
    addPurchasedBook,
    getPurchasedBooks,
    updatePurchasedBook,
    deletePurchasedBook
};
