
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI; 
    
    if (!MONGO_URI) {
        console.error("Hata: MONGO_URI .env dosyasında tanımlı değil!");
        process.exit(1); 
    }
    
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Bağlantı Hatası: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
