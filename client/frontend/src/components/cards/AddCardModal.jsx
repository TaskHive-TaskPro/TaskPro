import React, { useState } from "react";

const AddCardModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !deadline) {
      alert("Title ve deadline zorunludur");
      return;
    }

    onAdd({ title, description, priority, deadline });
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add Card</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={deadline}
          min={today} // geçmiş tarih seçilemez
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Add Card</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddCardModal;
