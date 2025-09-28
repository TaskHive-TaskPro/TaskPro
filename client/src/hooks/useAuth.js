// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth, AuthProvider içinde kullanılmalıdır.');
  }
  return context;
};