const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 100,
message: "Çok fazla istek gönderdiniz, lütfen 15 dakika sonra tekrar deneyin."
});
app.use(limiter);

app.get('/', (req, res) => {
 res.send('API çalışıyor...');
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`));
