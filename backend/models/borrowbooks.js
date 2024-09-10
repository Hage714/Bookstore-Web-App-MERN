const mongoose = require('mongoose');

const BorrowbookSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    borrowedDate: Date,
    returnedDate: Date,
    status: {
        type: String,
        enum: ['Borrowed', 'Returned'],
        default: 'Borrowed'
    }


});

module.exports = mongoose.model('Borrowbook', BorrowbookSchema);


