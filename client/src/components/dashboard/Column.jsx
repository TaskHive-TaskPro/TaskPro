import React, { useState } from "react";
import Styles from "./dashboard.module.css";

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

const Column = ({ column, onAddCard, selectedPriority }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={Styles.columnContainer}>
      <h2 className={Styles.columnTitle}>{column.title}</h2>

      <div className={Styles.cardList}>
        {column.cards.map((card) => (
          <div key={card.id} className={Styles.cardItem}>
            <span
              className={`${Styles.priorityDot} ${
                card.priority === "low"
                  ? Styles.priorityLow
                  : card.priority === "medium"
                  ? Styles.priorityMedium
                  : card.priority === "high"
                  ? Styles.priorityHigh
                  : Styles.priorityNone
              }`}
            ></span>
            <h3 className={Styles.cardTitle}>{card.title}</h3>
            <p className={Styles.cardDesc}>{card.description}</p>
          </div>
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
    </div>
  );
};

export default Column;
