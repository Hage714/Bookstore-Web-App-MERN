const express = require('express');
const { createRequestedBook, requestedBooks } = require('../controllers/requestedbooks');

const router = express.Router();

router.get('/', requestedBooks);
router.post('/', createRequestedBook);

module.exports = router;