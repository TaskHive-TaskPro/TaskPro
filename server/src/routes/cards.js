import express from "express";
import { getCards, createCard, updateCard, deleteCard, moveCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCards);
router.post("/", protect, createCard);
router.put("/move/:id", protect, moveCard); // Önce spesifik route
router.put("/:id", protect, updateCard);     // Sonra genel route
router.delete("/:id", protect, deleteCard);

export default router;
