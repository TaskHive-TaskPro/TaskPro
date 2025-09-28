const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Ad alanı boş bırakılamaz"] 
  },
  email: { 
    type: String, 
    required: [true, "Email alanı boş bırakılamaz"], 
    unique: true, 
    match: [/.+@.+\..+/, "Lütfen geçerli bir email adresi girin."] 
  },
  password: { 
    type: String, 
    required: [true, "Şifre alanı boş bırakılamaz"] 
  },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
