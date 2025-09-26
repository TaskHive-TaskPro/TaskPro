import React from 'react';
import Auth from '../components/auth/Auth';
import { AuthProvider } from '../context/AuthContext';

const AuthWrapper = () => {
  return (
    <AuthProvider>
      <Auth />  
    </AuthProvider>
  );
};

export default AuthWrapper;
