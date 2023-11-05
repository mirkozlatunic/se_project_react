import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  card,
  onCreateModal,
  onSelectCard,
  onCardLike,
  clothingItems,
  loggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const filteredCards = clothingItems.filter((card) => {
    return card.owner === currentUser?._id;
  });

  return (
    <div className="clothes__section">
      <div className="clothes__section-title-wrapper">
        <p className="clothes__section-title">Your items:</p>
        <button
          type="submit"
          className="clothes__section-button"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothing__section-cards">
        {filteredCards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              loggedIn={loggedIn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
