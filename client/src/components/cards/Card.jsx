import React from "react";
import BellIcon from "../../assets/icons/bell-light.svg";
import ArrowIcon from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/pencil-01.svg";
import TrashIcon from "../../assets/icons/trash-04.svg";

const Card = ({ card, onEdit, onDelete }) => {
  const { title, description, priority, deadline } = card;

  // Bugünün tarihi
  const today = new Date().toISOString().split("T")[0];
  const isDeadlineToday = deadline === today;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>

        <div className="card-actions">
          {isDeadlineToday && (
            <button className="icon-btn">
              <img src={BellIcon} alt="Deadline Today" />
            </button>
          )}
          <button className="icon-btn">
            <img src={ArrowIcon} alt="Move" />
          </button>

          <button className="icon-btn" onClick={() => onEdit(card)}>
            <img src={EditIcon} alt="Edit" />
          </button>

          <button className="icon-btn" onClick={() => onDelete(card.id)}>
            <img src={TrashIcon} alt="Delete" />
          </button>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-footer">
        <span className={`priority ${priority}`}>{priority}</span>
        <span className="deadline">{deadline}</span>
      </div>
    </div>
  );
};

export default Card;
