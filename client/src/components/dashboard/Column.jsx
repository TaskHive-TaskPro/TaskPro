import React, { useState } from "react";
import Styles from "./dashboard.module.css";
import Card from "../cards/Card";
import EditCardModal from "../cards/EditCardModal";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

// Priority renkleri
const priorityColors = {
  none: "grey",
  low: "#a88fddff",
  medium: "#d28dd5ff",
  high: "#6cb98eff",
};

// ---------------- EditColumnModal ----------------
const EditColumnModal = ({ columnTitle, onSave, onClose }) => {
  const [title, setTitle] = useState(columnTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && title.trim() !== "") {
      onSave(title.trim());
      onClose();
    }
  };

  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <form 
        className={Styles.modalContent} 
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={Styles.modalTitle}>Edit Column</h3>
        <input
          className={Styles.modalInput}
          placeholder="Column title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />
        <div className={Styles.modalActions}>
          <button type="button" onClick={onClose} className={Styles.btnCancel}>
            Cancel
          </button>
          <button type="submit" className={Styles.btnAdd}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// ---------------- DeleteColumnModal ----------------
const DeleteColumnModal = ({ columnTitle, onConfirm, onClose }) => {
  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div 
        className={Styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={Styles.modalTitle}>Delete Column</h3>
        <p className={Styles.modalText}>
          Are you sure you want to delete <strong>"{columnTitle}"</strong>?
          <br />
          <span className={Styles.modalWarning}>
            This will also delete all cards in this column.
          </span>
        </p>
        <div className={Styles.modalActions}>
          <button onClick={onClose} className={Styles.btnCancel}>
            Cancel
          </button>
          <button onClick={onConfirm} className={Styles.btnDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
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
  onEditColumn,
  onDeleteColumn,
  selectedPriority,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showEditColumnModal, setShowEditColumnModal] = useState(false);
  const [showDeleteColumnModal, setShowDeleteColumnModal] = useState(false);

  return (
    <div className={Styles.columnContainer}>
      <div className={Styles.columnHeader}>
        <h3 className={Styles.columnTitle}>{column.title}</h3>
        <div className={Styles.columnActions}>
          <button 
            className={Styles.columnActionBtn}
            onClick={() => setShowEditColumnModal(true)}
            aria-label="Edit column"
          >
            <FaPencilAlt size={14} />
          </button>
          <button 
            className={Styles.columnActionBtn}
            onClick={() => setShowDeleteColumnModal(true)}
            aria-label="Delete column"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      
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

      {showEditColumnModal && (
        <EditColumnModal
          columnTitle={column.title}
          onSave={(newTitle) => {
            onEditColumn && onEditColumn(column.id, newTitle);
            setShowEditColumnModal(false);
          }}
          onClose={() => setShowEditColumnModal(false)}
        />
      )}

      {showDeleteColumnModal && (
        <DeleteColumnModal
          columnTitle={column.title}
          onConfirm={() => {
            onDeleteColumn && onDeleteColumn(column.id);
            setShowDeleteColumnModal(false);
          }}
          onClose={() => setShowDeleteColumnModal(false)}
        />
      )}
    </div>
  );
};

export default Column;
