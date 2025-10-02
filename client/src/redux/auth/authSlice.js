// src/redux/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  // theme'i user içinde tutuyorsan buraya gerek yok; istersen ayrı da tutabilirsin.
};

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
    },
    // sadece user bilgisini güncellemek istersen
    setUser(state, action) {
      state.user = action.payload ?? null;
    },
    // sadece token güncellemek istersen
    setToken(state, action) {
      state.token = action.payload ?? null;
      state.isAuthenticated = Boolean(action.payload);
    },
    // loading flag’i kontrol etmek için
    setLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },
    // logout
    logOut(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
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
