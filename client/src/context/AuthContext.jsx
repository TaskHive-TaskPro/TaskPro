// client/src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // MOCK DATA - Backend hazır olana kadar
  const [user, setUser] = useState({ 
    name: 'TaskHive FullStack',
    email: 'taskpronode@gmail.com',
    avatar: null
  });
  const [token, setToken] = useState('mock-token-12345');
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (newUser) => {
    setUser(newUser);
    console.log('Mock: Kullanıcı güncellendi', newUser);
  };

  const login = async (email, password) => {
    console.log('Mock login:', email);
    return { success: true, user };
  };

  const logout = () => {
    console.log('Mock logout');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      updateUser,
      login,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};