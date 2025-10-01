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

const MainDashboard = ({ boardId }) => {
  const { token } = useAuth();
  const [columns, setColumns] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("none");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(null);

  // Board ve kartları yükle
  useEffect(() => {
    const fetchBoardAndCards = async () => {
      if (!token || !boardId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Board'u getir
        const boardRes = await fetch(`http://localhost:5001/api/boards/${boardId}`);
        const boardData = await boardRes.json();
        setBoard(boardData);
        
        // Kartları boardId ile getir
        const cards = await getCards(token, boardId);
        console.log('Fetched cards for board:', { boardId, cards });
        
        // Board'dan kolonları al - hem eski hem yeni formatı destekle
        let boardColumns = boardData.columns || [];
        
        // Eğer columns yoksa veya boşsa, default kolonları kullan
        if (!boardColumns || boardColumns.length === 0) {
          boardColumns = [
            { _id: 'todo', title: 'To Do' },
            { _id: 'inprogress', title: 'In Progress' },
            { _id: 'done', title: 'Done' }
          ];
        }
        
        // Her kolona ait kartları grupla
        const columnsWithCards = boardColumns.map(col => {
          // Hem eski format (_id: ObjectId) hem yeni format (_id: string) için destek
          const columnId = col._id?.toString() || col._id;
          return {
            id: columnId,
            title: col.title,
            cards: cards.filter(card => {
              const cardColumnId = card.columnId?.toString() || card.columnId;
              return cardColumnId === columnId;
            })
          };
        });
        
        setColumns(columnsWithCards);
      } catch (error) {
        console.error('Error fetching board and cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardAndCards();
  }, [token, boardId]);

  const addColumn = (newCol) => setColumns([...columns, newCol]);

  // Kolonu düzenleme
  const editColumn = (columnId, newTitle) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, title: newTitle } : col
    ));
  };

  // Kolonu silme
  const deleteColumn = (columnId) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  const addCard = async (columnId, card) => {
    if (!boardId) {
      alert('Please select a board first');
      return;
    }
    
    try {
      const cardWithBoardAndColumn = {
        ...card,
        boardId,
        columnId
      };
      const newCard = await createCard(cardWithBoardAndColumn, token);
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

  // Eğer boardId yoksa hoş geldiniz mesajı göster
  if (!boardId) {
    return (
      <div className={Styles.screensPage}>
        <div className={Styles.welcomeContainer}>
          <div className={Styles.welcomeContent}>
            <h1 className={Styles.welcomeTitle}>Welcome to TaskPro! 🎯</h1>
            <p className={Styles.welcomeText}>
              Before starting your project, it is essential to{' '}
              <span 
                className={Styles.createBoardLink}
                onClick={() => {
                  // Sidebar'daki "Create a new board" butonuna odaklan
                  const createBoardBtn = document.querySelector('[data-create-board]');
                  if (createBoardBtn) {
                    createBoardBtn.click();
                  }
                }}
              >
                create a board
              </span>
              {' '}to visualize and track all the necessary tasks and milestones. 
              This board serves as a powerful tool to organize the workflow and ensure 
              effective collaboration among team members.
            </p>
            <div className={Styles.welcomeIcon}>📋</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.screensPage}>
      <div className={Styles.filtersWrapper}>
        <h2>{board?.title || 'Project Office'}</h2>
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
                onEditColumn={editColumn}
                onDeleteColumn={deleteColumn}
                selectedPriority={selectedPriority}
              />
            ))}
            
            {/* Add Another Column Button */}
            <button 
              className={Styles.columnAddBtn}
              onClick={() => setShowAddColumn(true)}
            >
              + Add another column
            </button>
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
