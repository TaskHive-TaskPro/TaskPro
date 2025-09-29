import express from "express";
import { getCards, createCard, updateCard, deleteCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCards);
router.post("/", protect, createCard);
router.put("/:id", protect, updateCard);
router.delete("/:id", protect, deleteCard);

export default router;
