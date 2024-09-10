const express = require('express');
const { addPurchasedBook, getPurchasedBooks, updatePurchasedBook, deletePurchasedBook} = require('../controllers/purchasedbooks');

const router = express.Router();

router.post('/', addPurchasedBook);
router.get('/', getPurchasedBooks);
router.put('/:id', updatePurchasedBook);
router.delete('/:id', deletePurchasedBook);

module.exports = router;

