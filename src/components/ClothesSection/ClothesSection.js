import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  cards,
  onCreateModal,
  onSelectCard,
  selectedCard,
  setSelectedCard,
  onCardLikeClick,
  clothingItems,
  loggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const filteredCards = cards.filter((item) => {
    return item.owner === currentUser?._id;
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
              key={item?._id ?? item?.id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLikeClick={onCardLikeClick}
              selectedCard={selectedCard}
              onClick={() => {
                setSelectedCard(item);
                loggedIn = { loggedIn };
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
