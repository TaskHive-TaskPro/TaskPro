import React, { useState } from "react";

const FiltersModal = ({ onClose, onChangeBackground }) => {
  const colors = ["#111", "#4B0082", "#F5F5F5"];
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Select Background</h3>
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color}
              className="color-btn"
              style={{ backgroundColor: color }}
              onClick={() => onChangeBackground(color)}
            />
          ))}
        </div>
        <button onClick={onClose} className="btn-close-modal">
          Close
        </button>
      </div>
    </div>
  );
};

const HeaderDashboard = ({ title, onChangeBackground }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <header className="header-dashboard">
        <h1 className="header-title">{title}</h1>
        <button className="btn-filters" onClick={() => setShowFilters(true)}>
          Filters
        </button>
      </header>

      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onChangeBackground={onChangeBackground}
        />
      )}
    </>
  );
};

export default HeaderDashboard;
