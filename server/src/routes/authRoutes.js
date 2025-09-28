const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Token geçersiz veya süresi dolmuş" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Kullanıcı zaten doğrulanmış. Lütfen giriş yapın." });
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

router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
