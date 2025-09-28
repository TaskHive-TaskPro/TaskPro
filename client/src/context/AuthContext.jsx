// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authAPI from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await authAPI.login(userData);
      setUser(response);
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
  };

  const value = {
    user,
    login,
    register,
    logout,
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
