import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './boards/boardsApi';

export const store = configureStore({
  reducer: {
        [boardsApi.reducerPath]: boardsApi.reducer,
      
  },
  middleware: (getDefault) => getDefault().concat(boardsApi.middleware),
});