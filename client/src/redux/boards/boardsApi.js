// src/redux/boards/boardsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = import.meta.env.VITE_API_URL || '/api';
const RESOURCE = import.meta.env.VITE_BOARD_RESOURCE || 'boards'; // varsayılan çoğul

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// 404 olursa /boards <-> /board değiştirip 1 kez daha dene
const smartBaseQuery = async (args, api, extra) => {
  let res = await rawBaseQuery(args, api, extra);
  const url = typeof args === 'string' ? args : args?.url;
  if (res.error?.status === 404 && url) {
    const alt = url.includes('/boards') ? url.replace('/boards', '/board')
                                        : url.replace('/board', '/boards');
    if (alt !== url) {
      res = await rawBaseQuery({ ...(typeof args === 'string' ? { url: alt } : { ...args, url: alt }) }, api, extra);
    }
  }
  return res;
};

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: smartBaseQuery,
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => `${RESOURCE}`,
      providesTags: (result) => {
        const list = Array.isArray(result) ? result : result?.data ?? [];
        return list.length
          ? [...list.map(b => ({ type: 'Board', id: b._id || b.id })), { type: 'Board', id: 'LIST' }]
          : [{ type: 'Board', id: 'LIST' }];
      },
    }),
    addBoard: builder.mutation({
      query: ({ data }) => ({ url: `${RESOURCE}`, method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, data }) => ({ url: `${RESOURCE}/${boardId}`, method: 'PUT', body: data }),
      invalidatesTags: (r, e, { boardId }) => [{ type: 'Board', id: boardId }, { type: 'Board', id: 'LIST' }],
    }),
    deleteBoard: builder.mutation({
      query: ({ boardId }) => ({ url: `${RESOURCE}/${boardId}`, method: 'DELETE' }),
      invalidatesTags: (r, e, { boardId }) => [{ type: 'Board', id: boardId }, { type: 'Board', id: 'LIST' }],
    }),
    getBoardById: builder.query({
      query: (boardId) => `${RESOURCE}/${boardId}`,
      providesTags: (r, e, boardId) => [{ type: 'Board', id: boardId }],
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
