import React, { useState } from "react";

// AddCardModal
const AddCardModal = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAdd({ id: Date.now().toString(), title, description });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3 className="modal-title">Add Card</h3>
        <input
          className="modal-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="modal-textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-add">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

const Column = ({ column, onAddCard }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="column-container">
      <h2 className="column-title">{column.title}</h2>

      <div className="card-list">
        {column.cards.map((card) => (
          <div key={card.id} className="card-item">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.description}</p>
          </div>
        ))}
      </div>

      <button className="btn-add-card" onClick={() => setShowModal(true)}>
        + Add another card
      </button>

      {showModal && (
        <AddCardModal
          onAdd={(card) => onAddCard(column.id, card)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Column;
