const express = require('express'); 
const { upload } = require('../utils/fileHandler');
const { addBook, editBook, deleteBook, viewBooks, getBookById } = require('../controllers/books');

const router = express.Router();
router.get('/', viewBooks);
router.post('/', upload.single("image"), addBook);
router.get('/:id', getBookById);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);


module.exports = router;



