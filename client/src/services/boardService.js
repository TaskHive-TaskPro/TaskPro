import axiosInstance from '../api/axiosInstance.js';

export async function getBoard(boardId) {
  const { data } = await axiosInstance.get(`/api/boards/${boardId}`);
  return data;
}

export async function createBoard(boardData) {
  console.log('🔵 Creating board:', boardData);
  const res = await axiosInstance.post('/api/boards', boardData);
  console.log('✅ Board created:', res.data);
  return res.data;
}

export async function getBoards() {
  console.log('🔵 Fetching boards...');
  const res = await axiosInstance.get('/api/boards');
  console.log('✅ Boards fetched:', res.data);
  return res.data;
}

export async function updateBoard(boardId, boardData) {
  console.log('🔵 Updating board:', boardId, boardData);
  const res = await axiosInstance.put(`/api/boards/${boardId}`, boardData);
  console.log('✅ Board updated:', res.data);
  return res.data;
}

export async function deleteBoard(boardId) {
  console.log('🔵 Deleting board:', boardId);
  const res = await axiosInstance.delete(`/api/boards/${boardId}`);
  console.log('✅ Board deleted');
  return res.data;
}
