import React, { useState, useEffect } from 'react';
import Auth from '../components/auth/Auth';
import { AuthProvider } from '../context/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';

const AuthWrapper = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 2500); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <AuthProvider>
            {isInitialLoading && <LoadingOverlay />}
            <Auth />
        </AuthProvider>
    );
};

export default AuthWrapper;