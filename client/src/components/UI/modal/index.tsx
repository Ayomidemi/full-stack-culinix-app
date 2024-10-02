import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./styles.module.scss";
import Button from "../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={styles.loader_wrapper} onClick={onClose}>
          <div
            className={styles.modal_container}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modal_closer}>
              <IoCloseCircleOutline onClick={onClose} />
            </button>

            <h3 className={styles.modal_header}>
              Are you sure you want to delete?
            </h3>

            <div className={styles.modal_body}>
              <p>Please note that this action is permanent.</p>

              <div className={styles.modal_footer}>
                <Button
                  onClick={() => onClose()}
                  text="Cancel"
                  variant="transparent"
                />
                <Button
                  onClick={() => onClose()}
                  text="Delete"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
