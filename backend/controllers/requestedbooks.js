const RequestedBook = require('../models/requestedbooks');
const Customer = require('../models/customers');

// Create a new requested book
const requestedBooks = async(req, res) => {
    try {
        console.log({ user: req.user } )
        if(req.user.role === 'admin') {
            const requestedBooks = await RequestedBook.find();
            res.json(requestedBooks);
        } else {
            const customer = await Customer.findOne({ user: req.user.id});
            if(!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            const requestedBooks = await RequestedBook.find({ customer: customer._id });
            res.status(200).send(requestedBooks);
        }
        
    } catch (error) {
        console.error('Error getting requested books:', error);
        res.status(500).json({ error: 'Failed to get requested books' });
    }
}


const createRequestedBook = async (req, res) => {
    try {
        const { book, quantity } = req.body;

        if (!book || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const customer = await Customer.findOne({ user: req.user.id });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }


        const requestedBook = new RequestedBook({ 
            book: book, 
            customer: customer._id, 
            quantity: quantity
        });
        await requestedBook.save();
        res.status(201).send(requestedBook);
    } catch (error) {
        console.error('Error creating requested book:', error);
        res.status(500).json({ error: 'Failed to create requested book' });
    }
};

module.exports = { createRequestedBook, requestedBooks}

