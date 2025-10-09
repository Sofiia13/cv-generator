import React from "react";
import "../styles/modal.scss";

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ onClose, children }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal__close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
