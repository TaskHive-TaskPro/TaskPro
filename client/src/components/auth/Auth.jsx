import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../validation/authSchema';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import HeaderIcon from "./assets/headerIcon.png";
import TextIcon from "./assets/icon.png";
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'; 

const Auth = ({ verificationStatus, showModalInitially = false }) => {
  const [showModal, setShowModal] = useState(showModalInitially);
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleModalToggle = () => {
  setShowModal((prev) => !prev);
};

  const handleAuthTypeChange = (type) => {
    setIsRegister(type === 'register');
    reset();
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
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
        } else throw new Error('Login başarısız: Token alınamadı');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Bilinmeyen bir hata oluştu.');
      if (err.response?.data?.message?.includes('doğrulayın')) {
        setIsRegister(false);
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const RegistrationForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="Enter your name" {...register('name')} />
        <p className={styles.error}>{errors.name?.message}</p>
      </div>
      <div className={styles.inputGroup}>
        <input type="email" placeholder="Enter your email" {...register('email')} />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={`${styles.inputGroup} ${styles.passwordInput}`}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          {...register('password')}
        />
        <span className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button className={styles.registerNowBtn} type="submit">Register Now</button>
    </form>
  );

  const LoginForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <input type="email" placeholder="Enter your email" {...register('email')} />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={`${styles.inputGroup} ${styles.passwordInput}`}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        <span className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button className={styles.loginNowBtn} type="submit">Log In Now</button>
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
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <img src={HeaderIcon} alt="Main Logo" className={styles.authAvatarMain} />

        <div className={styles.logoSection}>
          <img src={TextIcon} alt="Task Pro Icon" className={styles.logoImg} />
          <h1>Task Pro</h1>
        </div>

        <p className={styles.tagline}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.registerBtn}
            onClick={() => { handleAuthTypeChange('register'); handleModalToggle(); }}
          >
            Registration
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => { handleAuthTypeChange('login'); handleModalToggle(); }}
          >
            Log In
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleModalToggle}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {verificationStatus ? (
              <VerificationStatusDisplay />
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <span
                    className={`${styles.modalTab} ${isRegister ? styles.active : ''}`}
                    onClick={() => handleAuthTypeChange('register')}
                  >
                    Registration
                  </span>
                  <span
                    className={`${styles.modalTab} ${!isRegister ? styles.active : ''}`}
                    onClick={() => handleAuthTypeChange('login')}
                  >
                    Log In
                  </span>
                </div>
                {isRegister ? <RegistrationForm /> : <LoginForm />}
              </>
            )}
            <button className={styles.closeModal} onClick={handleModalToggle}>
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
