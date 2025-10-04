// frontend/src/components/layout/UserInfo.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, X, Eye, EyeOff, Camera, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

import { toast } from 'react-toastify';
import styles from './UserInfo.module.css';

// Kullanıcı profili düzenleme şeması - TÜM ALANLAR OPSİYONEL
const profileSchema = yup.object({
  name: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .test('name-validation', '', function(value) {
      if (!value) return true; // Boşsa sorun yok
      
      if (value.length < 2) {
        return this.createError({ message: 'İsim en az 2 karakter olmalıdır' });
      }
      if (value.length > 32) {
        return this.createError({ message: 'İsim en fazla 32 karakter olabilir' });
      }
      if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) {
        return this.createError({ message: 'İsim sadece harf içerebilir' });
      }
      return true;
    }),
  email: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .test('email-validation', '', function(value) {
      if (!value) return true; // Boşsa sorun yok
      
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return this.createError({ message: 'Geçerli bir email formatı kullanınız' });
      }
      return true;
    }),
  currentPassword: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .when(['newPassword'], {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) => schema.required('Yeni şifre girdiğinizde mevcut şifre zorunludur'),
      otherwise: (schema) => schema.nullable()
    }),
  newPassword: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .test('password-validation', '', function(value) {
      if (!value) return true; // Boşsa sorun yok
      
      if (value.length < 8) {
        return this.createError({ message: 'Şifre en az 8 karakter olmalıdır' });
      }
      if (value.length > 64) {
        return this.createError({ message: 'Şifre en fazla 64 karakter olabilir' });
      }
      if (/\s/.test(value)) {
        return this.createError({ message: 'Şifre boşluk içeremez' });
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return this.createError({ 
          message: 'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir' 
        });
      }
      return true;
    }),
  confirmPassword: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .when(['newPassword'], {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) => 
        schema
          .required('Şifre onayı zorunludur')
          .oneOf([yup.ref('newPassword')], 'Şifreler eşleşmiyor'),
      otherwise: (schema) => schema.nullable()
    })
});

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { user, updateUser, token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  useEffect(() => {
    if (isModalOpen && user) {
      // Form'u tamamen boş başlat - sadece değiştirmek istedikleri alanları doldursunlar
      reset({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setAvatarPreview(null);
      setApiError('');
    }
  }, [isModalOpen, user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');

    try {
      const formData = new FormData();
      let hasChanges = false;

      // Avatar varsa ekle
      if (avatarPreview) {
        formData.append('avatar', avatarPreview);
        hasChanges = true;
      }

      // Name değişmişse ekle
      if (data.name && data.name.trim() && data.name.trim() !== user.name) {
        formData.append('name', data.name.trim());
        hasChanges = true;
      }

      // Email değişmişse ekle
      if (data.email && data.email.trim() && data.email !== user.email) {
        formData.append('email', data.email.trim());
        hasChanges = true;
      }
      
      // Şifre değişikliği varsa ekle
      if (data.newPassword && data.newPassword.trim()) {
        if (!data.currentPassword) {
          setError('currentPassword', {
            type: 'manual',
            message: 'Mevcut şifrenizi giriniz'
          });
          setLoading(false);
          return;
        }
        formData.append('currentPassword', data.currentPassword);
        formData.append('newPassword', data.newPassword);
        hasChanges = true;
      }

      // Hiçbir değişiklik yoksa uyar
      if (!hasChanges) {
        toast.info('Hiçbir değişiklik yapılmadı');
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 400 && responseData.message === 'Current password is incorrect') {
          setError('currentPassword', { 
            type: 'server', 
            message: 'Mevcut şifre yanlış' 
          });
          return;
        } else if (response.status === 409 && responseData.message === 'Email already exists') {
          setError('email', { 
            type: 'server', 
            message: 'Bu email adresi zaten kullanılıyor' 
          });
          return;
        }
        throw new Error(responseData.message || 'Profil güncellenirken bir hata oluştu');
      }

      // Kullanıcı bilgilerini güncelle
      await updateUser(responseData.user);
      
      toast.success('Profil başarıyla güncellendi!');
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      setApiError(error.message || 'Profil güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Dosya boyutu kontrolü (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Avatar dosyası 5MB\'dan küçük olmalıdır');
        return;
      }

      // Dosya tipi kontrolü
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Sadece JPG, PNG ve WebP formatlarında dosya yükleyebilirsiniz');
        return;
      }

      setAvatarPreview(file);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${import.meta.env.VITE_API_URL}${avatarPath}`;
  };

  if (!user) return null;

  return (
    <>
      {/* User Info Button */}
      <button
        className={styles.userInfoButton}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.userAvatar}>
          {user.avatar ? (
            <img 
              src={getAvatarUrl(user.avatar)} 
              alt={user.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span 
            className={styles.userInitials}
            style={{ display: user.avatar ? 'none' : 'flex' }}
          >
            {getInitials(user.name)}
          </span>
        </div>
        <span className={styles.userName}>{user.name}</span>
      </button>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Profili Düzenle</h2>
              <button
                className={styles.modalClose}
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            {apiError && (
              <div className={styles.apiError}>
                <AlertCircle size={16} />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
              {/* Avatar Upload */}
              <div className={`${styles.formGroup} ${styles.avatarGroup}`}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatarPreview}>
                    {avatarPreview ? (
                      <img src={URL.createObjectURL(avatarPreview)} alt="Preview" />
                    ) : user.avatar ? (
                      <img 
                        src={getAvatarUrl(user.avatar)} 
                        alt={user.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={styles.avatarPlaceholder}
                      style={{ 
                        display: (avatarPreview || user.avatar) ? 'none' : 'flex' 
                      }}
                    >
                      <User size={40} />
                    </div>
                  </div>
                  <label className={styles.avatarUploadLabel}>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleAvatarChange}
                      className={styles.avatarUploadInput}
                      disabled={loading}
                    />
                    <Camera size={16} />
                    Avatar Değiştir
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="name">İsim (opsiyonel)</label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                  disabled={loading}
                  placeholder={`Mevcut: ${user.name} - Değiştirmek için yeni isim girin`}
                />
                {errors.name && (
                  <span className={styles.errorMessage}>{errors.name.message}</span>
                )}
              </div>

              {/* Email Field */}
              <div className={styles.formGroup}>
                <label htmlFor="email">Email (opsiyonel)</label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                  disabled={loading}
                  placeholder={`Mevcut: ${user.email} - Değiştirmek için yeni email girin`}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email.message}</span>
                )}
              </div>

              {/* Current Password Field */}
              {newPassword && (
                <div className={styles.formGroup}>
                  <label htmlFor="currentPassword">Mevcut Şifre *</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      {...register('currentPassword')}
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      className={`${styles.formInput} ${errors.newPassword ? styles.error : ''}`}
                      disabled={loading}
                      placeholder="Mevcut şifrenizi giriniz"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      disabled={loading}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <span className={styles.errorMessage}>{errors.currentPassword.message}</span>
                  )}
                </div>
              )}

              {/* New Password Field */}
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">Yeni Şifre</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    {...register('newPassword')}
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    className={`${styles.formInput} ${errors.newPassword ? styles.error : ''}`}
                    disabled={loading}
                    placeholder="Yeni şifrenizi giriniz (opsiyonel)"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className={styles.errorMessage}>{errors.newPassword.message}</span>
                )}
                <small className={styles.fieldHint}>
                  En az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir
                </small>
              </div>

              {/* Confirm Password Field */}
              {newPassword && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Şifre Onayı *</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      {...register('confirmPassword')}
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                      disabled={loading}
                      placeholder="Yeni şifrenizi tekrar giriniz"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className={styles.spinner} />
                      Güncelleniyor...
                    </>
                  ) : (
                    'Güncelle'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;