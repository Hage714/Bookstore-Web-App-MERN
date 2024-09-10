const mongoose = require('mongoose');

const RequestedbookSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    book: String,
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ['Pending', 'Found', 'Not Found'],
        default: 'Pending'
    },
    requestedAt: {
        type: Date,
        default: Date.now
    }
    

});

module.exports = mongoose.model('Requestedbook', RequestedbookSchema);

