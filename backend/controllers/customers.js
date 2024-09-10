const Customer = require('../models/customers');

const viewCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
module.exports = {viewCustomers}
