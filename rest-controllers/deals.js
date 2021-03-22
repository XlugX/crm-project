const Deal = require('../models/deal');
const Transaction = require('../models/transaction');


const createDeal = async (req, res) => {
    const deal = new Deal(req.body);

    await deal.save();

    const transaction = new Transaction({
        name: `Создание сделки от ${deal.createdAt}`,
        objectId: deal._id,
        authorId: req.body.author
    });

    await transaction.save();

    res.json(deal);
};

const getDeals = async (req, res) => {
    const deals = await Deal.find();

    res.json(deals)
};

const getDeal = async (req, res) => {
    const id = req.params.id;

    const deals = await Deal.findById(id);

    res.json(deals);
};

const getTransactionsForDeal = async (req, res) => {
    const id = req.params.id;

    const transactions = await Transaction.find({ objectId: id });

    res.json(transactions);
};

const updateDeal = async (req, res) => {
    const id = req.params.id,
        prevVersion = await Deal.findById(id),
        checkUpdateFields = ['status', 'name', 'phone'],
        changedFields = [];

    checkUpdateFields.forEach(key => {
        if (String(req.body[key]) !== String(prevVersion._doc[key])) {
            changedFields.push({
                field: key,
                before: prevVersion._doc[key],
                after: req.body[key]
            });
        };
    });

    const deal = await Deal.findByIdAndUpdate(id, req.body);

    const transaction = new Transaction({
        name: `Редактирование сделки`,
        objectId: id,
        authorId: req.body.author,
        changed: {
            type: 'edit',
            fields: changedFields
        }
    });

    await transaction.save();

    res.json(deal);
};

const removeDeal = async (req, res) => {
    const id = req.params.id;

    await Deal.findByIdAndRemove(id);

    const deals = await Deal.find();

    res.json(deals);
};


module.exports = {
    createDeal,
    getDeals,
    getDeal,
    getTransactionsForDeal,
    updateDeal,
    removeDeal
};