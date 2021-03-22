const { Schema, model } = require('mongoose');

const LeadSchema = new Schema ({
    name: String,
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['to_do', 'in_progress', 'done'],
        default: 'to_do'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Lead', LeadSchema);
