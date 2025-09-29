import React, { useState, useEffect } from 'react';
import './AuthPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../validation/authSchema';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'; 
import HeaderIcon from "./assets/headerIcon.png";
import TextIcon from "./assets/icon.png"

const Auth = ({ verificationStatus, showModalInitially = false }) => {
  const [showModal, setShowModal] = useState(showModalInitially);
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleModalToggle = () => setShowModal(!showModal);

  const handleAuthTypeChange = (type) => {
    setIsRegister(type === 'register');
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const calculateRandomDelay = () => {
      const minMs = 2000;
      const maxMs = 3000;
      return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  };

  const onSubmit = async (data) => {
    setIsLoading(true); 
    
    const delayTime = calculateRandomDelay();
    const minDelay = new Promise(resolve => setTimeout(resolve, delayTime));
    
    const authOperation = (async () => {
      if (isRegister) {
        const message = await registerUser(data);
        alert(message);
        reset();
        setIsRegister(false); 
      } else {
        const response = await login(data);
        if (response && response.token) {
          reset();
          setShowModal(false);
          navigate('/home');
        } else {
          throw new Error('Login başarısız: Token alınamadı');
        }
      }
    })();
    
    try {
      await Promise.all([authOperation, minDelay]);
      
    } catch (err) {
      let errorMessage = 'Bilinmeyen bir hata oluştu.';
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      alert(`Hata: ${errorMessage}`);
      if (errorMessage.includes('doğrulayın') || errorMessage.includes('onay')) {
        setIsRegister(false);
        setShowModal(true);
      }
    } finally {
      setIsLoading(false); 
    }
  };

  const RegistrationForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <input type="text" placeholder="Enter your name" {...register('name')} />
        <p className="error">{errors.name?.message}</p>
      </div>
      <div className="input-group">
        <input type="email" placeholder="Enter your email" {...register('email')} />
        <p className="error">{errors.email?.message}</p>
      </div>
      <div className="input-group password-input">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          {...register('password')}
        />
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <p className="error">{errors.password?.message}</p>
      </div>
      <button className="register-now-btn" type="submit">Register Now</button>
    </form>
  );

  const LoginForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <input type="email" placeholder="Enter your email" {...register('email')} />
        <p className="error">{errors.email?.message}</p>
      </div>
      <div className="input-group password-input">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <p className="error">{errors.password?.message}</p>
      </div>
      <button className="login-now-btn" type="submit">Log In Now</button>
    </form>
  );

  const VerificationStatusDisplay = () => {
    if (!verificationStatus) return null;
    const { loading, message, success } = verificationStatus;
    const className = success ? 'success' : 'error';
    return (
      <div className={`verification-status ${className}`}>
        {loading ? '⏳' : success ? '✅' : '❌'}
        <p>{message}</p>
        {!loading && (
          <button onClick={handleModalToggle} className="ok-btn">
            {success ? 'Giriş Yap' : 'Kapat'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
                <img 
            src={HeaderIcon} 
            alt="Main Logo" 
            className="auth-avatar-main"
        />

        <div className="logo-section">
          <img 
            src={TextIcon}
            alt="Task Pro Icon" 
            className="logo-img"
          />
          <h1>Task Pro</h1>
        </div>
        <p className="tagline">
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <div className="button-group">
          <button
            className="register-btn"
            onClick={() => {
              handleAuthTypeChange('register');
              handleModalToggle();
            }}
          >
            Registration
          </button>
          <button
            className="login-btn"
            onClick={() => {
              handleAuthTypeChange('login');
              handleModalToggle();
            }}
          >
            Log In
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleModalToggle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {verificationStatus ? (
              <VerificationStatusDisplay />
            ) : (
              <>
                <div className="modal-header">
                  <span
                    className={`modal-tab ${isRegister ? 'active' : ''}`}
                    onClick={() => handleAuthTypeChange('register')}
                  >
                    Registration
                  </span>
                  <span
                    className={`modal-tab ${!isRegister ? 'active' : ''}`}
                    onClick={() => handleAuthTypeChange('login')}
                  >
                    Log In
                  </span>
                </div>
                {isRegister ? <RegistrationForm /> : <LoginForm />}
              </>
            )}
            <button className="close-modal" onClick={handleModalToggle}>
              &times;
            </button>
          </div>
        </div>
      )}

      {isLoading && <LoadingOverlay />} 
    </div>
  );
};

export default Auth;
