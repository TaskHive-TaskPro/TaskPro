import React, { useState, useEffect } from "react";
import Column from "./Column";
import Styles from "./dashboard.module.css";
import AddAnotherColumn from "./AddAnotherColumn";
import { FaFilter } from "react-icons/fa";
import { getCards, createCard, updateCard as updateCardAPI, deleteCard as deleteCardAPI } from "../../services/cardService";
import { useAuth } from "../../context/AuthContext";

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
  const { token } = useAuth();
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: "To do",
      cards: [],
    },
    {
      id: "2",
      title: "In progress",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      cards: [],
    },
  ]);

  const [selectedPriority, setSelectedPriority] = useState("none");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cards'ları API'den yükle
  useEffect(() => {
    const fetchCards = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const cards = await getCards(token);
        console.log('Fetched cards:', cards);
        
        // Cards'ları kolonlara dağıt (varsayılan olarak "To do" kolonuna)
        if (cards && cards.length > 0) {
          setColumns(prevColumns => 
            prevColumns.map(col => 
              col.id === "1" 
                ? { ...col, cards: cards }
                : col
            )
          );
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [token]);

  const addColumn = (newCol) => setColumns([...columns, newCol]);

  const addCard = async (columnId, card) => {
    try {
      const newCard = await createCard(card, token);
      setColumns(
        columns.map((col) =>
          col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
        )
      );
    } catch (error) {
      console.error('Error creating card:', error);
      alert('Kart oluşturulamadı: ' + error.message);
    }
  };

  const updateCard = async (columnId, updatedCard) => {
    try {
      const updated = await updateCardAPI(updatedCard._id, updatedCard, token);
      setColumns(
        columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                cards: col.cards.map((card) =>
                  card._id === updated._id ? updated : card
                ),
              }
            : col
        )
      );
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Kart güncellenemedi: ' + error.message);
    }
  };

  const deleteCard = async (columnId, cardId) => {
    try {
      await deleteCardAPI(cardId, token);
      setColumns(
        columns.map((col) =>
          col.id === columnId
            ? { ...col, cards: col.cards.filter((card) => card._id !== cardId) }
            : col
        )
      );
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Kart silinemedi: ' + error.message);
    }
  };

  const moveCard = (columnId, cardId) => {
    console.log('Moving card:', { columnId, cardId }); // Debug için
    
    setColumns((prevColumns) => {
      const sourceColumnIndex = prevColumns.findIndex((col) => col.id === columnId);
      const targetColumnIndex = sourceColumnIndex + 1;
      
      // Son kolondaysa taşıma yapma
      if (targetColumnIndex >= prevColumns.length) {
        console.log('Card already in last column');
        return prevColumns;
      }

      const sourceColumn = prevColumns[sourceColumnIndex];
      const card = sourceColumn.cards.find((c) => (c._id || c.id) === cardId);
      
      if (!card) {
        console.log('Card not found:', cardId);
        return prevColumns;
      }

      console.log('Moving card from column', sourceColumn.title, 'to', prevColumns[targetColumnIndex].title);

      // Yeni kolonları oluştur
      const newColumns = [...prevColumns];
      
      // Kaynak kolondan kartı çıkar
      newColumns[sourceColumnIndex] = {
        ...sourceColumn,
        cards: sourceColumn.cards.filter((c) => (c._id || c.id) !== cardId)
      };
      
      // Hedef kolona kartı ekle
      newColumns[targetColumnIndex] = {
        ...newColumns[targetColumnIndex],
        cards: [...newColumns[targetColumnIndex].cards, card]
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
        {loading ? (
          <div className={Styles.loadingContainer}>
            <div className={Styles.loader}></div>
            <p>Loading cards...</p>
          </div>
        ) : (
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
        )}
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
