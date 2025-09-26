// // FiltersModal.jsx
// import React from "react";
// import Styles from "./dashboard.module.css";

// const FiltersModal = ({ onClose, onSelectPriority }) => {
//   const priorities = [
//     { key: "none", label: "Without", style: Styles.priorityNone },
//     { key: "low", label: "Low", style: Styles.priorityLow },
//     { key: "medium", label: "Medium", style: Styles.priorityMedium },
//     { key: "high", label: "High", style: Styles.priorityHigh },
//   ];

//   return (
//     <div className={Styles.modalOverlay}>
//       <div className={Styles.modalContent}>
//         <h3 className={Styles.modalTitle}>Select Priority</h3>
//         <div className={Styles.colorOptions}>
//           {priorities.map((p) => (
//             <button
//               key={p.key}
//               className={`${Styles.colorBtn} ${p.style}`}
//               onClick={() => onSelectPriority(p.key)}
//             >
//               {p.label}
//             </button>
//           ))}
//         </div>
//         <button onClick={onClose} className={Styles.btnCloseModal}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FiltersModal;
