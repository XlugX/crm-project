const Lead = require('../models/lead');

const getLeads = async (req, res) => {
    const leads = await Lead.find();

    res.json(leads);
};

const createLead = async (req, res) => {
    const lead = new Lead(req.body);

    await lead.save();

    res.json(lead);
};

const changeLead = async (req, res) => {
    const id = req.params.id;

    const lead = await Lead.findByIdAndUpdate(id, req.body);

    res.json(lead);
};

const deleteLead = async (req, res) => {
    const id = req.params.id;

    await Lead.findByIdAndRemove(id);

    const leads = await Lead.find();

    res.json(leads);
};

const getLead = async (req, res) => {
    const id = req.params.id;

    const lead = await Lead.findById(id);

    res.json(lead);
};


module.exports = { getLead, createLead, changeLead, deleteLead, getLeads };