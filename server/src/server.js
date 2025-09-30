// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'; // MongoDB bağlantısı
import cardRoutes from './routes/cards.js'; // Card router
import authRoutes from './routes/authRoutes.js'; // Auth router
import boardsRoutes from "./routes/boards.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3001',
    process.env.CLIENT_URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB bağlan
connectDB();

// Routes
app.use('/api/auth', authRoutes); // <-- Auth route eklendi
app.use('/api/cards', cardRoutes);
app.use("/api/boards", boardsRoutes);

// Test route
app.get('/', (req, res) => res.send('Server çalışıyor'));

// Server başlat
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};
start();

export default app;