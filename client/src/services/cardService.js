import axios from "axios";

const API_URL = "/api/cards";

export const getCards = async (token) => { // token parametresi al
  console.log("getCards fonksiyonu çağrıldı", token); // token'ı konsola yazdır
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}` // token'ı header'a ekle
    }
  });
  console.log("getCards yanıtı:", res.data); // yanıtı konsola yazdır
  return res.data;
};

export const createCard = async (card, token) => {
  const res = await axios.post(API_URL, card, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const updateCard = async (id, updatedCard) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedCard);
  return res.data;
};

export const deleteCard = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
export const moveCard = async (id, newColumnId) => {
  // Backend'de taşıma işlemi için bir endpoint oluşturmalısın
  const res = await axios.put(`${API_URL}/move/${id}`, { newColumnId });
  return res.data;
};