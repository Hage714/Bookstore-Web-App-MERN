const express = require('express');
const { viewCustomers } = require('../controllers/customers');
const router = express.Router();

router.get('/', viewCustomers);

module.exports = router;
