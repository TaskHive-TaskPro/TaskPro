// backend/src/routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// TEMPORARY: Verify all users (ONLY FOR DEVELOPMENT)
router.get("/verify-all-dev", async (req, res) => {
  try {
    const result = await User.updateMany(
      { verified: false },
      { $set: { verified: true, verificationToken: undefined } }
    );
    res.json({
      message: "Tüm kullanıcılar doğrulandı",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify email route
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token geçersiz veya süresi dolmuş" });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ message: "Kullanıcı zaten doğrulanmış. Lütfen giriş yapın." });
    }

    // Doğrulama başarılı
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // JWT üret
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "E-posta adresiniz doğrulandı. Giriş yapılıyor...",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Doğrulama sırasında hata oluştu." });
  }
});

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password/:token", resetPassword);

export default router;
