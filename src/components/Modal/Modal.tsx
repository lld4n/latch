import React from "react";
import styles from "./Modal.module.scss";
export default function Modal({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.modal}>
      <div className={styles.section}>
        <input type="text"  />
      </div>
      <div className={styles.overlay} onClick={() => setOpenModal(false)} />
    </div>
  );
}
