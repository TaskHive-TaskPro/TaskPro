import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Ad alanı boş bırakılamaz').min(3, 'Ad en az 3 karakter olmalıdır'),
  email: yup.string().email('Geçerli bir email adresi girin').required('Email alanı boş bırakılamaz'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre alanı boş bırakılamaz'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir email adresi girin').required('Email alanı boş bırakılamaz'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre alanı boş bırakılamaz'),
});