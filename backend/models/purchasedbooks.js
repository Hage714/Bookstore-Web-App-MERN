const mongoose = require('mongoose');

const PurchasedbookSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
   book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
   },
   quantity: Number,
    price: Number,
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Purchasedbook', PurchasedbookSchema);

