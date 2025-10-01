import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { boardsApi } from '../boards/boardsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(boardsApi.middleware),
});