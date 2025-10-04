// backend/src/controllers/authController.js
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { hashPassword } from "../utils/hash.js";
import { registerSchema } from "../utils/validate.js";
import { sendEmail } from "../utils/email.js";

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Kullanıcı kayıt
export const registerUser = asyncHandler(async (req, res) => {
  console.log('Server received register data:', req.body);
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    console.log('Validation error:', error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { name, email, password } = value;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Bu email adresi zaten kullanılıyor.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    await user.save();

    // Email gönderimi - hata olursa devam et
    try {
      const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
      await sendEmail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Hesabınızı Doğrulayın",
        html: `Hesabınızı doğrulamak için <a href="${verificationUrl}">tıklayın</a>. Link 12 saat geçerlidir.`,
      });
      console.log('✅ Verification email sent to:', user.email);
    } catch (emailError) {
      console.error('⚠️ Email gönderim hatası (kullanıcı kaydedildi):', emailError.message);
      // Email hatası kullanıcı kaydını engellemesin
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      message: "Hesabınız Başarıyla oluşturuldu.",
    });
  } else {
    res.status(400);
    throw new Error("Geçersiz kullanıcı verisi");
  }
});

// Email doğrulama
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    res.status(400);
    throw new Error("Doğrulama linki geçersiz veya süresi dolmuş.");
  }

  if (user.verified) {
    res.status(200).json({ message: "Hesabınız zaten doğrulandı." });
    return;
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({
    message: "E-posta adresiniz başarıyla doğrulandı.",
  });
});

// Giriş
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('🔵 Login attempt for:', email);

  const user = await User.findOne({ email });

  if (!user) {
    console.log('❌ User not found:', email);
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  console.log('✅ User found, verified status:', user.verified);

  // Email doğrulama kontrolü
  if (!user.verified && process.env.NODE_ENV === 'production') {
    console.log('⚠️ User not verified:', email);
    return res.status(403).json({
      message: "Lütfen önce email adresinizi doğrulayın. Doğrulama linki email adresinize gönderildi."
    });
  }

  if (!user.verified) {
    console.log('⚠️ User not verified but allowing login (development mode):', email);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('❌ Password mismatch for:', email);
    return res.status(400).json({ message: "Email veya şifre yanlış" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log('✅ Login successful for:', email);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
    },
    message: "Giriş başarılı!",
  });
});

// Şifre sıfırlama talebi
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("Bu email adresine sahip bir kullanıcı bulunamadı.");
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 dakika
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Şifre Sıfırlama Talebi",
    html: `Şifrenizi sıfırlamak için <a href="${resetUrl}">tıklayın</a>. Bu link 15 dakika içinde geçersiz olacaktır.`,
  });

  res.status(200).json({ message: "Şifre sıfırlama linki emailinize gönderildi." });
});

// Yeni şifre belirleme
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(400);
    throw new Error("Geçersiz veya süresi dolmuş token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(400);
    throw new Error("Geçersiz veya süresi dolmuş token");
  }

  if (user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
    res.status(400);
    throw new Error("Geçersiz veya süresi dolmuş token");
  }

  user.password = await hashPassword(password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Şifreniz başarıyla sıfırlandı." });
});
