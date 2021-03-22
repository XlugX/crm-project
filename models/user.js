const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    phone: String,
    roles: {
        type: String,
        enum: ['Admin', 'User', 'Ghost'],
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', UserSchema);
