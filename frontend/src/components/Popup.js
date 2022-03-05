import React from "react";
import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`${name==='image' ? 'popup__image-container' : 'popup__container'}`}>
        {children}
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button button-effect"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
