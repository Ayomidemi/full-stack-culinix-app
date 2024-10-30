import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./styles.module.scss";
import Button from "../button";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idd = searchParams.get("id") || "";

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data } = await axios.delete(`/recipe/delete-recipe/${idd}`);

      if (data.status) {
        onClose();
        toast.success(data.message);
        navigate(`/my-recipes`);
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setSending(false);
  };

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
                  onClick={handleSubmit}
                  text={sending ? "Deleting..." : "Delete"}
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
