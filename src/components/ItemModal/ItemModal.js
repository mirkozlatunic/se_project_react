import "./ItemModal.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, handleDeleteItemSubmit }) => {
  const userContext = useContext(CurrentUserContext);
  const currentUser = userContext ? userContext : { name: "n/a", avatar: "" };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = Boolean(currentUser._id) && selectedCard.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={selectedCard.name}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container modal__container-image">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image-preview"
        />
        <h3 className="modal__item-name">{selectedCard.name}</h3>
        <div className="modal__weather-type">
          Weather type: {selectedCard.weather}
        </div>
        <button
          type="button"
          className={itemDeleteButtonClassName}
          onClick={handleDeleteItemSubmit}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
