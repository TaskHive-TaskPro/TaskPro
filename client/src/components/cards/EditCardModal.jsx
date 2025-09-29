import React, { useState } from "react";
import styles from "./editCards.module.css";

const EditCardModal = ({ card, onClose, onUpdate }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [deadline, setDeadline] = useState(card.deadline);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !deadline) {
      alert("Title ve deadline zorunludur");
      return;
    }

    onUpdate({
      ...card,
      title,
      description,
      priority,
      deadline,
    });

    onClose();
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Edit Card</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={deadline}
          min={today} // geçmiş tarih seçilemez
          onChange={(e) => setDeadline(e.target.value)}
          className={styles.dateInput}
        />
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCardModal;
