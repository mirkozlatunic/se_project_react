import "./ItemModal.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const handleDeleteItemSubmit = () => {
    onDeleteItem(selectedCard);
  };
  const userContext = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");
  const userData = userContext ? userContext : { name: "n/a", avatar: "" };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === userData._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const modalDeleteClass = `modal_delete-button ${
    isOwn ? "modal_delete-button_visible" : "modal_delete-button_hidden"
  }`;
  return (
    <div className={"modal"}>
      <div className="modal__container modal__container-image">
        <button
          type="button"
          onClick={onClose}
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
          className={modalDeleteClass}
          onClick={() => handleDeleteItemSubmit(selectedCard, token)}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
