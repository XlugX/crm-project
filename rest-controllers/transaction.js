const Transaction = require('../models/transaction');

const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({ });

    res.json(transactions);
};

module.exports = { getTransactions };