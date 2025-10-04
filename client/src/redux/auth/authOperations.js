// src/redux/auth/authOperations.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOut as logOutAction } from './authSlice';

// VITE_API_URL varsa onu kullan (ör: http://localhost:5001/api)
// Yoksa sadece '/api' kullan (proxy üzerinden gider)
const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export const api = axios.create({
  baseURL,
});

const setAuthHeader = (t) => t && (api.defaults.headers.common.Authorization = `Bearer ${t}`);
const clearAuthHeader = () => delete api.defaults.headers.common.Authorization;

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState()?.auth?.token;
    if (token) setAuthHeader(token);

    try {
      await api.post('/auth/logout'); // -> /api/auth/logout (proxy ile)
    } catch (err) {
      // Backend'te logout endpoint yoksa 404'i yut
      if (err?.response?.status !== 404) throw err;
    }

    clearAuthHeader();
    thunkAPI.dispatch(logOutAction()); // state temizle
    return { success: true };
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Logout failed';
    return thunkAPI.rejectWithValue(msg);
  }
});

export const needHelp = createAsyncThunk('auth/feedback', async (credentials, thunkAPI) => {
  try {
    const token = thunkAPI.getState()?.auth?.token;
    if (!token) return thunkAPI.rejectWithValue('Unable to fetch user (no token)');
    setAuthHeader(token);
    const res = await api.post('/feedback/sendFeedback', credentials); // -> /api/feedback/...
    return res.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Feedback failed';
    return thunkAPI.rejectWithValue(msg);
  }
});
