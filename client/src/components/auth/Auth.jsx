import React, { useState } from 'react';
import './AuthPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from './icon.png';
import avatar from './headerIcon.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../validation/authSchema';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleModalToggle = () => setShowModal(!showModal);
  const handleAuthTypeChange = (type) => setIsRegister(type === 'register');

  // Register form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        await registerUser(data);
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      } else {
        await login(data);
      }
      reset();
      setShowModal(false);
      navigate('/home');
    } catch (err) {
      alert(err);
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

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={avatar} alt="Avatar" className="auth-avatar" />
        <div className="logo-section">
          <img src={logo} alt="Task Pro Logo" className="logo-img" />
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
            <button className="close-modal" onClick={handleModalToggle}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
