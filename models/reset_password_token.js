const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resetToken: {
        type: String,
        required: true,
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const resetPasswordToken = mongoose.model('resetPasswordToken', resetPasswordTokenSchema);

module.exports = resetPasswordToken;