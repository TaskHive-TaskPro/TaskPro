import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { connectDB } from './config/db.js';
import cardRoutes from './routes/cards.js';
import authRoutes from './routes/authRoutes.js';
import boards from "./routes/boards.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware - en başta
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - uploads klasörünü serve et
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test route
app.get('/', (req, res) => res.send('Server çalışıyor'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use("/api/boards", boards);
app.use("/api/user", userRoutes);

// Server başlat
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ CORS enabled for: http://localhost:5173`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

start();

export default app;
