import React, { useState } from "react";
import Styles from "./dashboard.module.css";
import Card from "../cards/Card";
import EditCardModal from "../cards/EditCardModal";

// Priority renkleri
const priorityColors = {
  none: "#bdc3c7",
  low: "#2ecc71",
  medium: "#f1c40f",
  high: "#e74c3c",
};

// ---------------- AddCardModal ----------------
const AddCardModal = ({ onAdd, onClose, selectedPriority }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(selectedPriority || "none");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      const today = new Date().toISOString().split("T")[0]; // bugünün tarihi
      onAdd({
        title,
        description,
        priority,
        deadline: today,
      });
      onClose();
    }
  };

  return (
    <div className={Styles.modalOverlay}>
      <form className={Styles.modalContent} onSubmit={handleSubmit}>
        <h3 className={Styles.modalTitle}>Add Card</h3>
        <input
          className={Styles.modalInput}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={Styles.modalTextarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className={Styles.modalInput}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ color: priorityColors[priority] }}
        >
          <option value="none" style={{ color: priorityColors.none }}>
            Without priority
          </option>
          <option value="low" style={{ color: priorityColors.low }}>
            Low
          </option>
          <option value="medium" style={{ color: priorityColors.medium }}>
            Medium
          </option>
          <option value="high" style={{ color: priorityColors.high }}>
            High
          </option>
        </select>
        <div className={Styles.modalActions}>
          <button type="button" onClick={onClose} className={Styles.btnCancel}>
            Cancel
          </button>
          <button type="submit" className={Styles.btnAdd}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

// ---------------- Column ----------------
const Column = ({
  column,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onMoveCard,
  selectedPriority,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);

  return (
    <div className={Styles.columnContainer}>
      <h2 className={Styles.columnTitle}>{column.title}</h2>

      <div className={Styles.cardList}>
        {column.cards.map((card) => (
          <Card
            key={card._id || card.id}
            card={card}
            onEdit={() => setEditCard(card)}
            onDelete={() => onDeleteCard && onDeleteCard(column.id, card._id || card.id)}
            onMove={() => onMoveCard && onMoveCard(column.id, card._id || card.id)}
          />
        ))}
      </div>

      <button className={Styles.btnAddCard} onClick={() => setShowModal(true)}>
        + Add another card
      </button>

      {showModal && (
        <AddCardModal
          onAdd={(card) => onAddCard(column.id, card)}
          onClose={() => setShowModal(false)}
          selectedPriority={selectedPriority}
        />
      )}

      {editCard && (
        <EditCardModal
          card={editCard}
          onUpdate={(updated) => {
            onUpdateCard(column.id, updated);
            setEditCard(null);
          }}
          onClose={() => setEditCard(null)}
        />
      )}
    </div>
  );
};

export default Column;
