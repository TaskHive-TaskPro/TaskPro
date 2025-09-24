import React, { useState } from "react";
import Column from "./Column";

const MainDashboard = () => {
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: "To do",
      cards: [
        {
          id: "c1",
          title: "The Watch Spot Design",
          description: "Complete visually stunning and eye-catching design..."
        }
      ]
    },
    {
      id: "2",
      title: "In progress",
      cards: [
        {
          id: "c2",
          title: "Content Creation",
          description: "Write and design marketing content..."
        }
      ]
    }
  ]);

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
    <main className="main-dashboard">
      <div className="columns-wrapper">
        {columns.map((col) => (
          <Column key={col.id} column={col} onAddCard={addCard} />
        ))}

        <div className="column-add-btn" onClick={addColumn}>
          + Add another column
        </div>
      </div>
    </main>
  );
};

export default MainDashboard;
