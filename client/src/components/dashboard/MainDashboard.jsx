import React, { useState } from "react";
import Column from "./Column";
import Styles from "./dashboard.module.css";
import HeaderDashboard from "./HeaderDashboard";

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

  const addColumn = () => {
    const title = prompt("Enter column title:");
    if (title) {
      setColumns([...columns, { id: Date.now().toString(), title, cards: [] }]);
    }
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
  setColumns(prevColumns => {
    const newColumns = [...prevColumns];
    const currentIndex = newColumns.findIndex(col => col.id === columnId);
    if (currentIndex === -1) return prevColumns;

    const currentColumn = newColumns[currentIndex];
    const card = currentColumn.cards.find(c => c.id === cardId);
    if (!card) return prevColumns;

    // Sadece yan kolon varsa taşı
    if (currentIndex < newColumns.length - 1) {
      currentColumn.cards = currentColumn.cards.filter(c => c.id !== cardId);
      newColumns[currentIndex + 1].cards.push(card);
    }

    return newColumns;
  });
};


  return (
    <div className={Styles.screensPage}>
      <HeaderDashboard
        title="Project Office"
        onSelectPriority={(p) => setSelectedPriority(p)}
      />
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

          <div className={Styles.columnAddBtn} onClick={addColumn}>
            + Add another column
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
