// utils/email.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // Port 587 için genellikle 'secure: false' kullanılır.
    secure: process.env.EMAIL_PORT == 465, 
    auth: {
        user: process.env.EMAIL_USER,
        // Brevo şifresi uzun olduğu için boşluk sorunlarını önlemek için trim() kullanıldı.
        pass: process.env.EMAIL_PASS.trim(), 
    },
});

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("E-posta Gönderme Hatası:", error); 
        throw new Error("E-posta gönderimi başarısız oldu.");
    }
};

module.exports = { sendEmail };