// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connect.js"; // connectDB fonksiyonu
import cardRoutes from "./routes/cardRoutes.js"; // oluşturduğun router

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlan
connectDB();

// Routes
app.use("/api/cards", cardRoutes);

// Test route
app.get("/", (req, res) => res.send("Server çalışıyor"));

// Server başlat
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
