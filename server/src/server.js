// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./db/connect.js"; // MongoDB bağlantısı
import authRoutes from "./routes/authRoutes.js"; // auth route
import cardRoutes from "./routes/cardRoutes.js"; // card route
import errorHandler from "./middleware/errorHandler.js"; // özel error handler

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100,
    message: "Çok fazla istek gönderdiniz, lütfen 15 dakika sonra tekrar deneyin."
});
app.use(limiter);

// MongoDB bağlantısı
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

// Test route
app.get("/", (req, res) => res.send("Server çalışıyor"));

// Error handler
app.use(errorHandler);

// Server başlat
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
