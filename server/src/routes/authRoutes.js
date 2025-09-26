const express = require('express');
const {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
