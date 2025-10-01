// backend/src/controllers/userController.js
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { hashPassword } from "../utils/hash.js";

// Profil güncelleme - Sadece gönderilen alanları güncelle
export const updateProfile = asyncHandler(async (req, res) => {
  console.log('🔵 Update profile request:', req.user.id);
  console.log('🔵 Update data:', req.body);
  console.log('🔵 File uploaded:', req.file);
  
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("Kullanıcı bulunamadı");
  }

  const updateData = {};

  // Avatar güncelleme - dosya yüklenmişse
  if (req.file) {
    // Dosya yolu: /uploads/avatars/filename.jpg
    updateData.avatar = `/uploads/avatars/${req.file.filename}`;
  }

  // Name güncelleme
  if (req.body.name && req.body.name.trim() !== user.name) {
    updateData.name = req.body.name.trim();
  }

  // Email güncelleme
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ 
      email: req.body.email,
      _id: { $ne: userId }
    });
    
    if (emailExists) {
      res.status(409);
      throw new Error("Bu email adresi zaten kullanılıyor");
    }
    
    updateData.email = req.body.email;
  }

  // Şifre güncelleme
  if (req.body.newPassword) {
    if (!req.body.currentPassword) {
      res.status(400);
      throw new Error("Mevcut şifrenizi giriniz");
    }

    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Mevcut şifre yanlış");
    }

    updateData.password = await hashPassword(req.body.newPassword);
  }

  // Theme güncelleme
  if (req.body.theme && ['light', 'dark', 'violet'].includes(req.body.theme)) {
    updateData.theme = req.body.theme;
  }

  // Güncelleme varsa kaydet
  if (Object.keys(updateData).length > 0) {
    Object.assign(user, updateData);
    await user.save();
    console.log('✅ Profile updated successfully');
  } else {
    console.log('⚠️ No changes to update');
  }

  // Şifre olmadan kullanıcı bilgilerini döndür
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    theme: user.theme,
    verified: user.verified,
  };

  res.json({
    message: "Profil başarıyla güncellendi",
    user: userResponse,
  });
});

// Kullanıcı bilgilerini getir
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error("Kullanıcı bulunamadı");
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    theme: user.theme,
    verified: user.verified,
  });
});
