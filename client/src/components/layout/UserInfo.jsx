// frontend/src/components/layout/UserInfo.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, X, Eye, EyeOff, Camera, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

// Kullanıcı profili düzenleme şeması
const profileSchema = yup.object({
  name: yup
    .string()
    .required('İsim zorunludur')
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(32, 'İsim en fazla 32 karakter olabilir')
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harf içerebilir'),
  email: yup
    .string()
    .required('Email zorunludur')
    .email('Geçerli bir email adresi giriniz')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Geçerli bir email formatı kullanınız'
    ),
  currentPassword: yup
    .string()
    .when(['newPassword'], {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) => schema.required('Mevcut şifrenizi giriniz'),
      otherwise: (schema) => schema.notRequired()
    }),
  newPassword: yup
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .max(64, 'Şifre en fazla 64 karakter olabilir')
    .matches(/^\S*$/, 'Şifre boşluk içeremez')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir'),
  confirmPassword: yup
    .string()
    .when(['newPassword'], {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) => 
        schema
          .required('Şifre onayı zorunludur')
          .oneOf([yup.ref('newPassword')], 'Şifreler eşleşmiyor'),
      otherwise: (schema) => schema.notRequired()
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
      reset({
        name: user.name || '',
        email: user.email || '',
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
      formData.append('name', data.name);
      formData.append('email', data.email);
      
      if (data.newPassword) {
        formData.append('currentPassword', data.currentPassword);
        formData.append('newPassword', data.newPassword);
      }

      if (avatarPreview) {
        formData.append('avatar', avatarPreview);
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
        className="user-info-button"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="user-avatar">
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
            className="user-initials" 
            style={{ display: user.avatar ? 'none' : 'flex' }}
          >
            {getInitials(user.name)}
          </span>
        </div>
        <span className="user-name">{user.name}</span>
      </button>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Profili Düzenle</h2>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            {apiError && (
              <div className="api-error">
                <AlertCircle size={16} />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
              {/* Avatar Upload */}
              <div className="form-group avatar-group">
                <div className="avatar-container">
                  <div className="avatar-preview">
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
                      className="avatar-placeholder"
                      style={{ 
                        display: (avatarPreview || user.avatar) ? 'none' : 'flex' 
                      }}
                    >
                      <User size={40} />
                    </div>
                  </div>
                  <label className="avatar-upload-label">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleAvatarChange}
                      className="avatar-upload-input"
                      disabled={loading}
                    />
                    <Camera size={16} />
                    Avatar Değiştir
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">İsim *</label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  disabled={loading}
                  placeholder="Adınızı giriniz"
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  disabled={loading}
                  placeholder="Email adresinizi giriniz"
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              {/* Current Password Field */}
              {newPassword && (
                <div className="form-group">
                  <label htmlFor="currentPassword">Mevcut Şifre *</label>
                  <div className="password-input-container">
                    <input
                      {...register('currentPassword')}
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                      disabled={loading}
                      placeholder="Mevcut şifrenizi giriniz"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      disabled={loading}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <span className="error-message">{errors.currentPassword.message}</span>
                  )}
                </div>
              )}

              {/* New Password Field */}
              <div className="form-group">
                <label htmlFor="newPassword">Yeni Şifre</label>
                <div className="password-input-container">
                  <input
                    {...register('newPassword')}
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    className={`form-input ${errors.newPassword ? 'error' : ''}`}
                    disabled={loading}
                    placeholder="Yeni şifrenizi giriniz (opsiyonel)"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="error-message">{errors.newPassword.message}</span>
                )}
                <small className="field-hint">
                  En az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir
                </small>
              </div>

              {/* Confirm Password Field */}
              {newPassword && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Şifre Onayı *</label>
                  <div className="password-input-container">
                    <input
                      {...register('confirmPassword')}
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      disabled={loading}
                      placeholder="Yeni şifrenizi tekrar giriniz"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword.message}</span>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
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