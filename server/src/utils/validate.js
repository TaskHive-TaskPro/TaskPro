// backend/src/utils/validate.js
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Ad alanı boş bırakılamaz",
      "string.min": "Ad en az 3 karakter olmalıdır",
      "string.max": "Ad en fazla 50 karakter olabilir",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email alanı boş bırakılamaz",
      "string.email": "Geçerli bir email adresi girin",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Şifre alanı boş bırakılamaz",
      "string.min": "Şifre en az 6 karakter olmalıdır",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email alanı boş bırakılamaz",
      "string.email": "Geçerli bir email adresi girin",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Şifre alanı boş bırakılamaz",
      "string.min": "Şifre en az 6 karakter olmalıdır",
    }),
});
