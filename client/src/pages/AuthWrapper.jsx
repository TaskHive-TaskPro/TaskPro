import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import { useAuth } from '../context/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';

const AuthWrapper = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 2500); 

        return () => clearTimeout(timer); 
    }, []);

    // Eğer kullanıcı zaten giriş yapmışsa, home'a yönlendir
    if (!isLoading && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return (
        <>
            {(isInitialLoading || isLoading) && <LoadingOverlay />}
            <Auth />
        </>
    );
};

export default AuthWrapper;