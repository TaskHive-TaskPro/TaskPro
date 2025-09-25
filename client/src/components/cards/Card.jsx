import React from "react";
import styles from "./cards.module.css";
import BellIcon from "../../assets/icons/bell-light.svg";
import ArrowIcon from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/pencil-01.svg";
import TrashIcon from "../../assets/icons/trash-04.svg";

const Card = ({ card, onEdit, onDelete }) => {
  const { title, description, priority, deadline } = card;

  const today = new Date().toISOString().split("T")[0];
  const isDeadlineToday = deadline === today;

  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <h3>{title}</h3>
        <div className={styles["card-actions"]}>
          {isDeadlineToday && (
            <button className={styles["icon-btn"]}>
              <img src={BellIcon} alt="Deadline Today" />
            </button>
          )}
          <button className={styles["icon-btn"]}>
            <img src={ArrowIcon} alt="Move" />
          </button>
          <button
            className={styles["icon-btn"]}
            onClick={() => onEdit(card)}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <button
            className={styles["icon-btn"]}
            onClick={() => onDelete(card.id)}
          >
            <img src={TrashIcon} alt="Delete" />
          </button>
        </div>
      </div>

      <p className={styles["card-description"]}>{description}</p>

      <div className={styles["card-footer"]}>
        <span className={`${styles.priority} ${styles[priority]}`}>
          {priority}
        </span>
        <span className={styles.deadline}>{deadline}</span>
      </div>
    </div>
  );
};

export default Card;
