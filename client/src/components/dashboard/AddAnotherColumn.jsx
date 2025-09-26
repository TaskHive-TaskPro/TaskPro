import React, { useState } from "react";
import Styles from "./dashboard.module.css";

const AddAnotherColumn = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ id: Date.now().toString(), title, cards: [] });
    setTitle("");
    onClose();
  };

  return (
    <div className={Styles.modalOverlay}>
      <form className={Styles.modalContent} onSubmit={handleSubmit}>
        <h3 className={Styles.modalTitle}>Add Column</h3>

        <input
          type="text"
          className={Styles.modalInput}
          placeholder="Column title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

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

export default AddAnotherColumn;
