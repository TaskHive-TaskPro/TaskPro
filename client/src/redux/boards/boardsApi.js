// client/src/redux/boards/boardsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log('🔵 RTK Query request with token:', !!token);
      return headers;
    },
  }),
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => '/api/boards', // GET /api/boards
      providesTags: (result) => {
        const list = Array.isArray(result) ? result : result?.data ?? [];
        return list.length
          ? [...list.map((b) => ({ type: 'Board', id: b._id || b.id })), { type: 'Board', id: 'LIST' }]
          : [{ type: 'Board', id: 'LIST' }];
      },
    }),
    addBoard: builder.mutation({
      query: ({ data }) => {
        console.log('🔵 RTK addBoard mutation:', data);
        return {
          url: '/api/boards',   // POST /api/boards
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, data }) => ({
        url: `/api/boards/${boardId}`, // PUT /api/boards/:id
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_r, _e, { boardId }) => [
        { type: 'Board', id: boardId },
        { type: 'Board', id: 'LIST' },
      ],
    }),
    deleteBoard: builder.mutation({
      query: ({ boardId }) => ({
        url: `/api/boards/${boardId}`, // DELETE /api/boards/:id
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    getBoardById: builder.query({
      query: (boardId) => `/api/boards/${boardId}`, // GET /api/boards/:id
      providesTags: (_r, _e, boardId) => [{ type: 'Board', id: boardId }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
} = boardsApi;
