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
import feedbackRoutes from "./routes/feedback.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS AYARI (tam düzenlenmiş hali)
const allowedOrigins = [
'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://taskpro-1.onrender.com',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Eğer istek origin'i izinli listede varsa veya undefined (Postman gibi) ise izin ver
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS engellendi:", origin);
        callback(new Error("CORS hatası: Bu origin'e izin yok"));
      }
    },
    credentials: true, // cookies/token’lar için
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // * yerine gerçek origin
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // cookies/token için
  }
 res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,PATCH,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') return res.sendStatus(200); // Preflight cevabı
  next();
});

// Static files - uploads klasörünü serve et
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Test route
app.get('/', (req, res) => res.send('Server çalışıyor'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/boards', boards);
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);

// Server başlat
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ Allowed Origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

start();

export default app;
