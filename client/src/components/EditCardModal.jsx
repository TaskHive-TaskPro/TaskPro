import React, { useState } from "react";

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

    // güncellenmiş kart verisini üst componente gönder
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
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCardModal;
