import axiosInstance from '../api/axiosInstance';

export async function getBoard(boardId) {
  const { data } = await axiosInstance.get(`/boards/${boardId}`);
  return data;
}
