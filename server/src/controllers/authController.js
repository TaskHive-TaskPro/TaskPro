const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');
const { registerSchema, loginSchema } = require('../utils/validate');
const { sendEmail } = require('../utils/email');

const registerUser = asyncHandler(async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { name, email, password } = value;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Bu email adresi zaten kullanılıyor.');
    }

    const hashedPassword = await hashPassword(password);

    const verificationToken = generateToken(email);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
    });

    if (user) {
        const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await sendEmail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Hesabınızı Doğrulayın',
            html: `Hesabınızı doğrulamak için lütfen bu linke tıklayın: <a href="${verificationUrl}">${verificationUrl}</a>`,
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            message: 'Hesabınızı doğrulamak için emailinize gönderilen linke tıklayın.',
        });
    } else {
        res.status(400);
        throw new Error('Geçersiz kullanıcı verisi');
    }
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.id });

    if (!user) {
        res.status(400);
        throw new Error('Geçersiz token');
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email başarıyla doğrulandı.' });
});

const loginUser = asyncHandler(async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { email, password } = value;

    const user = await User.findOne({ email });

    if (user && (await comparePassword(password, user.password))) {
        if (!user.verified) {
            res.status(401);
            throw new Error('Lütfen email adresinizi doğrulayın.');
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Geçersiz email veya şifre');
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('Bu email adresine sahip bir kullanıcı bulunamadı.');
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15m', 
    });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 900000; 
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Şifre Sıfırlama Talebi',
        html: `Şifrenizi sıfırlamak için lütfen bu linke tıklayın: <a href="${resetUrl}">${resetUrl}</a>. Bu link 15 dakika içinde geçersiz olacaktır.`,
    });

    res.status(200).json({ message: 'Şifre sıfırlama linki emailinize gönderildi.' });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
        res.status(400);
        throw new Error('Geçersiz veya süresi dolmuş token');
    }

    if (user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
        res.status(400);
        throw new Error('Geçersiz veya süresi dolmuş token');
    }

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Şifreniz başarıyla sıfırlandı.' });
});

module.exports = {
    registerUser,
    verifyEmail,
    loginUser,
    forgotPassword,
    resetPassword,
};
