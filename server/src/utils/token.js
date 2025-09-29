const jwt = require('jsonwebtoken');

/**
 * @param {string} id 
 * @param {string} expiresIn 
 * @returns {string} 
*/
const generateToken = (id, expiresIn = process.env.JWT_EXPIRES) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET tanımlı değil. Lütfen .env dosyasını kontrol edin.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = { generateToken };
