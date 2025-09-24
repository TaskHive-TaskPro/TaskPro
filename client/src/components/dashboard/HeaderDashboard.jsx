import React, { useState } from "react";
import Styles from "./dashboard.module.css";

const FiltersModal = ({ onClose, onSelectPriority }) => {
  const priorities = ["none", "low", "medium", "high"];
  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <h3 className={Styles.modalTitle}>Select Priority</h3>
        <div className={Styles.colorOptions}>
          {priorities.map((p) => (
            <button
              key={p}
              className={`${Styles.colorBtn} ${
                p === "low"
                  ? Styles.priorityLow
                  : p === "medium"
                  ? Styles.priorityMedium
                  : p === "high"
                  ? Styles.priorityHigh
                  : Styles.priorityNone
              }`}
              onClick={() => onSelectPriority(p)}
            >
              {p === "none" ? "Without" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={onClose} className={Styles.btnCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};

const HeaderDashboard = ({ title, onSelectPriority }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <header className={Styles.headerDashboard}>
        <h1 className={Styles.headerTitle}>{title}</h1>
        <button
          className={Styles.btnFilters}
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
      </header>

      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onSelectPriority={onSelectPriority}
        />
      )}
    </>
  );
};

export default HeaderDashboard;
