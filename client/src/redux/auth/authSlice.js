// src/redux/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan initial state'i oku
const loadInitialState = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return {
        user: userData || null,
        token: userData?.token || null,
        isLoading: false,
        isAuthenticated: Boolean(userData?.token),
      };
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error);
  }
  
  return {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
  };
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // { user, token } alır, login veya refresh sonrası çağırırsın
    setCredentials(state, action) {
      const { user, token } = action.payload || {};
      state.user = user ?? null;
      state.token = token ?? null;
      state.isAuthenticated = Boolean(token);
      
      // localStorage'a da kaydet
      if (user && token) {
        localStorage.setItem('user', JSON.stringify({ ...user, token }));
      }
    },
    // sadece user bilgisini güncellemek istersen
    setUser(state, action) {
      state.user = action.payload ?? null;
      
      // localStorage'ı güncelle
      if (state.token && state.user) {
        localStorage.setItem('user', JSON.stringify({ ...state.user, token: state.token }));
      }
    },
    // sadece token güncellemek istersen
    setToken(state, action) {
      state.token = action.payload ?? null;
      state.isAuthenticated = Boolean(action.payload);
      
      // localStorage'ı güncelle
      if (state.token && state.user) {
        localStorage.setItem('user', JSON.stringify({ ...state.user, token: state.token }));
      }
    },
    // loading flag'i kontrol etmek için
    setLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },
    // logout
    logOut(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      
      // localStorage'ı temizle
      localStorage.removeItem('user');
    },
  },
});

export const {
  setCredentials,
  setUser,
  setToken,
  setLoading,
  logOut,
} = authSlice.actions;

// 🔴 En kritik kısım: reducer’ı default export et
export default authSlice.reducer;
