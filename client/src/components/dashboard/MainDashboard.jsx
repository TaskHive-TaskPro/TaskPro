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
