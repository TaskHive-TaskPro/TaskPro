import React, { useState } from "react";
import Column from "./Column";
import Styles from "./dashboard.module.css";
import AddAnotherColumn from "./AddAnotherColumn";
import { FaFilter } from "react-icons/fa";

// Filters Modal component
const FiltersModal = ({ onClose, onSelectPriority, selectedPriority }) => {
  const priorities = ["none", "low", "medium", "high"];

  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <h3 className={Styles.modalTitle}>Select Priority</h3>

        <div className={Styles.colorOptions}>
          {priorities.map((p) => (
            <div
              key={p}
              className={`${Styles.colorOption} ${
                selectedPriority === p ? Styles.selectedPriority : ""
              }`}
              onClick={() => onSelectPriority(p)}
            >
              <span
                className={`${Styles.priorityDot} ${
                  p === "low"
                    ? Styles.priorityLow
                    : p === "medium"
                    ? Styles.priorityMedium
                    : p === "high"
                    ? Styles.priorityHigh
                    : Styles.priorityNone
                }`}
              ></span>
              <span className={Styles.priorityLabel}>
                {p === "none"
                  ? "Without"
                  : p.charAt(0).toUpperCase() + p.slice(1)}
              </span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className={Styles.btnCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: "To do",
      cards: [
        {
          id: "c1",
          title: "The Watch Spot Design",
          description: "Complete visually stunning and eye-catching design...",
          priority: "none",
        },
      ],
    },
    {
      id: "2",
      title: "In progress",
      cards: [
        {
          id: "c2",
          title: "Content Creation",
          description: "Write and design marketing content...",
          priority: "none",
        },
      ],
    },
  ]);

  const [selectedPriority, setSelectedPriority] = useState("none");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const addColumn = (newCol) => setColumns([...columns, newCol]);

  const addCard = (columnId, card) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, card] } : col
      )
    );
  };

  const updateCard = (columnId, updatedCard) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
              ),
            }
          : col
      )
    );
  };

  const deleteCard = (columnId, cardId) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  const moveCard = (columnId, cardId) => {
    setColumns((prevColumns) => {
      const currentIndex = prevColumns.findIndex((col) => col.id === columnId);
      if (currentIndex === prevColumns.length - 1) return prevColumns;

      const currentCol = prevColumns[currentIndex];
      const card = currentCol.cards.find((c) => c.id === cardId);
      if (!card) return prevColumns;

      const newColumns = prevColumns.map((col, i) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      );

      newColumns[currentIndex + 1] = {
        ...newColumns[currentIndex + 1],
        cards: [...newColumns[currentIndex + 1].cards, card],
      };

      return newColumns;
    });
  };

  return (
    <div className={Styles.screensPage}>
      <div className={Styles.filtersWrapper}>
        <h2>Project Office</h2>
        <button
          className={Styles.btnFilters}
          onClick={() => setShowFilters(true)}
        >
          <FaFilter style={{ marginRight: "8px" }} />
          Filters
        </button>
      </div>

      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onSelectPriority={(p) => setSelectedPriority(p)}
          selectedPriority={selectedPriority}
        />
      )}

      <main className={Styles.mainDashboard}>
        <div className={Styles.columnsWrapper}>
          {columns.map((col) => (
            <Column
              key={col.id}
              column={{
                ...col,
                cards:
                  selectedPriority === "none"
                    ? col.cards
                    : col.cards.filter(
                        (card) => card.priority === selectedPriority
                      ),
              }}
              onAddCard={addCard}
              onUpdateCard={updateCard}
              onDeleteCard={deleteCard}
              onMoveCard={moveCard}
              selectedPriority={selectedPriority}
            />
          ))}

          <div
            className={Styles.columnAddBtn}
            onClick={() => setShowAddColumn(true)}
          >
            + Add another column
          </div>
        </div>
      </main>

      {showAddColumn && (
        <AddAnotherColumn
          onAdd={addColumn}
          onClose={() => setShowAddColumn(false)}
        />
      )}
    </div>
  );
};

export default MainDashboard;
