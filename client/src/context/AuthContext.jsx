import React, { createContext, useState, useEffect, useContext } from 'react';
import authAPI from '../api/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // Kayıt olma
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      console.log(response)
      if (!response.ok) {
        throw new Error(data.message || 'Kayıt başarısız');
      }

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      throw error;
    }
  };

  // Giriş yapma
  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      throw error;
    }
  };

  // Çıkış yapma
  const logout = () => {
    authAPI.logout();
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      updateUser,
      register,
      login,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buraya dikkat: useContext import edilmeli
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
