import React from "react";
import styles from "./cards.module.css";
import BellLightIcon from "../../assets/icons/bell-light.svg";
import BellDarkIcon from "../../assets/icons/bell-01.svg";
import BellVioletIcon from "../../assets/icons/bell-violet.svg";
import ArrowIcon from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/pencil-01.svg";
import TrashIcon from "../../assets/icons/trash-04.svg";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// Priority renkleri
const priorityColors = {
  none: "grey",
  low: "#a88fddff",
  medium: "#d28dd5ff",
  high: "#6cb98eff",
};

const Card = ({ card, onEdit, onDelete, onMove }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'light';
  const { title, description, priority, deadline } = card;
  const today = new Date().toISOString().split("T")[0];
  const isDeadlineToday = deadline === today;
  const isOverdue = deadline < today;
  
  const getDeadlineClass = () => {
    if (isOverdue) return 'overdue';
    if (isDeadlineToday) return 'today';
    return '';
  };

  const getBellIcon = () => {
    switch (theme) {
      case 'dark':
        return BellDarkIcon; // Dark tema için bell-01.svg
      case 'light':
        return BellLightIcon; // Light tema için bell-light.svg
      case 'violet':
        return BellVioletIcon; // Violet tema için bell-violet.svg
      default:
        return BellLightIcon;
    }
  };

  return (
    <div className={styles.card}>
      {/* Soldaki renkli şerit */}
      <div
        className={styles.priorityStripe}
        style={{ backgroundColor: priorityColors[priority] }}
      ></div>

      <div className={styles.cardContent}>
        <div className={styles["card-header"]}>
          <h3>{title}</h3>
          <div className={styles["card-actions"]}>
            {isDeadlineToday && (
              <button className={styles["icon-btn"]}>
                <img src={getBellIcon()} alt="Deadline Today" className={styles["bell-icon"]} />
              </button>
            )}
            <button className={styles["icon-btn"]} onClick={() => {
              console.log('Move button clicked for card:', card._id || card.id);
              if (onMove) onMove();
            }}>
              <img src={ArrowIcon} alt="Move" />
            </button>
            <button className={styles["icon-btn"]} onClick={() => onEdit(card)}>
              <img src={EditIcon} alt="Edit" />
            </button>
            <button
              className={styles["icon-btn"]}
              onClick={() => onDelete(card._id)}
            >
              <img src={TrashIcon} alt="Delete" />
            </button>
          </div>
        </div>

        <p className={styles["card-description"]}>{description}</p>

        <div className={styles["card-footer"]}>
          <div className={styles["priority-deadline"]}>
            <span className={`${styles.priority} ${styles[priority]}`}>
              {priority === 'none' ? 'No Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className={`${styles.deadline} ${styles[getDeadlineClass()]}`}>
              {deadline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
