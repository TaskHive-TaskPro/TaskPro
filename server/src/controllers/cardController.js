// backend/src/controllers/cardController.js
import Card from "../models/Card.js";

// Tüm kartları getir (opsiyonel boardId filtresi ile)
export const getCards = async (req, res) => {
  try {
    const { boardId } = req.query;
    const filter = boardId ? { boardId } : {};
    const cards = await Card.find(filter);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Kartlar getirilemedi", error: error.message });
  }
};

// Yeni kart oluştur
export const createCard = async (req, res) => {
  try {
    const { title, description, priority, deadline, boardId, columnId } = req.body;
    
    if (!boardId || !columnId) {
      return res.status(400).json({ message: "boardId ve columnId gerekli" });
    }
    
    const newCard = new Card({ 
      title, 
      description, 
      priority, 
      deadline, 
      boardId, 
      columnId 
    });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Kart oluşturulamadı", error: error.message });
  }
};

// Kartı güncelle
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: "Kart bulunamadı" });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Kart güncellenemedi", error: error.message });
  }
};

// Kartı sil
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) return res.status(404).json({ message: "Kart bulunamadı" });
    res.json({ message: "Kart silindi", deletedCard });
  } catch (error) {
    res.status(500).json({ message: "Kart silinemedi", error: error.message });
  }
};
