const { Schema, model } = require('mongoose');

const DealSchema = new Schema ({
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
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Deal', DealSchema);
