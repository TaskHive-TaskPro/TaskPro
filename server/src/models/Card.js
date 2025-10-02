// backend/src/models/Card.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    enum: ["none", "low", "medium", "high"],
    default: "none",
  },
  deadline: {
    type: String, // YYYY-MM-DD formatında string
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  columnId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);

export default Card;
