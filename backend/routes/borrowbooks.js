const express = require('express');
const { borrowBook, getBorrowedBooks, returnBook } = require('../controllers/borrowbooks');

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getBorrowedBooks);
router.put('/:id', returnBook);

module.exports = router;




