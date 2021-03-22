const { Router } = require('express');
const { getTransactions } = require('../rest-controllers/transaction');
const { getLead, createLead, changeLead, deleteLead, getLeads } = require('../rest-controllers/leads');
const { createDeal, getDeals, getDeal, getTransactionsForDeal,
    updateDeal, removeDeal } = require('../rest-controllers/deals');
const router = Router();

router.get('/leads', getLeads);
router.post('/leads/create', createLead);
router.put('/leads/:id', changeLead);
router.delete('/leads/:id', deleteLead);
router.get('/leads/:id', getLead);

//Deals
router.post('/deals/create', createDeal);
router.get('/deals', getDeals);
router.get('/deals/:id', getDeal);
router.get('/deals/:id/transaction', getTransactionsForDeal);
router.put('/deals/:id', updateDeal);
router.delete('/deals/:id', removeDeal);

//transactions
router.get('/transactions', getTransactions)

module.exports = router;
