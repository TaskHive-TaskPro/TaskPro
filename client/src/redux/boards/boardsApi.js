import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = import.meta.env.VITE_API_URL || 'burayarenderadresiniyaz.com';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => 'board',
      providesTags: ['Board'],
    }),

    addBoard: builder.mutation({
      query: ({ data }) => ({
        url: 'board',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation({
      query: ({ boardId, data }) => ({
        url: `board/${boardId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),

    deleteBoard: builder.mutation({
      query: ({ boardId }) => ({
        url: `board/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),

    getBoardById: builder.query({
      query: (boardId) => `board/${boardId}`,
      providesTags: ['Board'],
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
