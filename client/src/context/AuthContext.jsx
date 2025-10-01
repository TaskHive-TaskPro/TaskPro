 // src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authAPI from '../api/auth.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(userData.token);
      } catch (error) {
        console.error('LocalStorage user data parse error:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const response = await authAPI.login(userData);
      setUser(response);
      setToken(response.token);
      // LocalStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error; 
    }
  };

  const register = async (userData) => {
    try {
      const message = await authAPI.register(userData);
      return message;
    } catch (error) {
      throw error; 
    }
  };

  const logout = () => {
    authAPI.logout(); 
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUserData) => {
    // Mevcut user ve token'ı koru, sadece gelen verileri güncelle
    const updatedUser = {
      ...user,
      ...updatedUserData,
      token: token // Token'ı koru
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) { 
    throw new Error('useAuth, AuthProvider içinde kullanılmalıdır.');
  }
  return context;
};