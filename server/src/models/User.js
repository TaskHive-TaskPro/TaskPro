const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Lütfen geçerli bir email adresi girin."],
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String, 
    resetPasswordToken: String, 
    resetPasswordExpires: Date,
}, {
    timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);
