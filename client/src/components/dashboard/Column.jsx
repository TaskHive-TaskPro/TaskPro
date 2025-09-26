import React, { useState } from "react";
import Styles from "./dashboard.module.css";
import Card from "../cards/Card"; // Card bileşenini import et
import EditCardModal from "../cards/EditCardModal"; // Düzenleme modalı

// AddCardModal
const AddCardModal = ({ onAdd, onClose, selectedPriority }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(selectedPriority || "none");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAdd({ id: Date.now().toString(), title, description, priority });
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
        >
          <option value="none">Without priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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

const Column = ({ column, onAddCard,onUpdateCard,onDeleteCard,onMoveCard, selectedPriority }) => {
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null); // Düzenlenecek kart

  return (
    <div className={Styles.columnContainer}>
      <h2 className={Styles.columnTitle}>{column.title}</h2>

      <div className={Styles.cardList}>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onEdit={(c) => setEditCard(c)} // Düzenleme modalını aç
            onDelete={(id) => onDeleteCard && onDeleteCard(column.id, id)} // Silme fonksiyonu, opsiyonel

            onMove={() => onMoveCard && onMoveCard(column.id, card.id)} // Taşıma fonksiyonu, opsiyonel


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
