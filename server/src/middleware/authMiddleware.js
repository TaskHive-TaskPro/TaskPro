const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT token doğrulama middleware'i
const protect = async (req, res, next) => {
    let token;

    // Authorization başlığında token kontrolü
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Tokeni al
            token = req.headers.authorization.split(' ')[1];

            // Tokeni doğrula
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tokendaki kullanıcıyı bul ve isteğe ekle
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Yetkisiz, token başarısız oldu');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Yetkisiz, token yok');
    }
};

module.exports = { protect };
