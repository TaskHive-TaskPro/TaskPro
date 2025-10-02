// backend/src/routes/userRoutes.js
import express from "express";
import { updateProfile, getProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = express.Router();

// Profil bilgilerini getir
router.get("/profile", protect, getProfile);

// Profil güncelle - multer ile dosya yükleme
router.patch("/profile", protect, uploadAvatar, updateProfile);

export default router;
