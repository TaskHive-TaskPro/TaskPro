import axiosInstance from '../api/axiosInstance';

export async function getBoard(boardId) {
  const { data } = await axiosInstance.get(`/boards/${boardId}`);
  return data;
}
export async function createBoard(data) {
  // beklenen şekil: { title, icon, background }
  const res = await axios.post('/boards', data);
  return res.data;
}

export async function getBoards() {
  const res = await axios.get('/boards');
  return res.data;
}