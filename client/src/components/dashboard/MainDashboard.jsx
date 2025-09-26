import React, { useState } from "react";
import Column from "./Column";
import Styles from "./dashboard.module.css";
import HeaderDashboard from "./HeaderDashboard";
import AddAnotherColumn from "./AddAnotherColumn";

// Filters Modal component
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
              {p === "none"
                ? "Without"
                : p.charAt(0).toUpperCase() + p.slice(1)}
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

  const addColumn = (newCol) => {
    setColumns([...columns, newCol]);
  };

  const addCard = (columnId, card) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, card] } : col
      )
    );
  };
  // Kartı güncelleme
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

// Kartı silme
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

    // Eğer zaten son kolondaysa -> hiçbir şey yapma
    if (currentIndex === prevColumns.length - 1) {
      return prevColumns;
    }

    // Taşınacak kartı bul
    const currentCol = prevColumns[currentIndex];
    const card = currentCol.cards.find((c) => c.id === cardId);
    if (!card) return prevColumns;

    // 1) Kartı bulunduğu kolondan çıkar
    const newColumns = prevColumns.map((col, i) =>
      col.id === columnId
        ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
        : col
    );

    // 2) Kartı bir sonraki kolona ekle
    newColumns[currentIndex + 1] = {
      ...newColumns[currentIndex + 1],
      cards: [...newColumns[currentIndex + 1].cards, card],
    };

    return newColumns;
  });
};

  return (
    <div className={Styles.screensPage}>
      {/* Filters butonu artık MainDashboard’da */}
      <div className={Styles.filtersWrapper}>
        <button
          className={Styles.btnFilters}
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
      </div>

      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onSelectPriority={(p) => setSelectedPriority(p)}
        />
      )}

      <main className={Styles.mainDashboard}>
        <div className={Styles.columnsWrapper}>
          {columns.map((col) => (
            <Column
              key={col.id}
              column={col}
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
