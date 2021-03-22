const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema ({
    name: String,
    objectId: {
        type: Schema.Types.ObjectId,
        ref: 'Deal'
    },
    changed: {
        type: {
            type: String,
            enum: ['create', 'edit', 'delete'],
            default: 'create'
        },
        fields: [
            {
                field: String,
                before: Schema.Types.Mixed,
                after: Schema.Types.Mixed
            }
        ]
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Transaction', TransactionSchema);
