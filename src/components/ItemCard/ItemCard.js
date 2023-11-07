import "./ItemCard.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const cardId = item._id;
  const userId = currentUser ? currentUser._id : "";

  // Check if the item was liked by the current user.The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const likeButtonClassName = isLiked
    ? "card__like-button card__like-button-active"
    : "card__like-button ";

  const handleLikeClick = () => {
    onCardLike({ id: cardId, isLiked: isLiked });
  };

  return (
    <div className="card__element">
      <div className="card__info">
        <span className="card__name">{item.name}</span>
        {loggedIn ? (
          <button
            className={likeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
        ) : (
          <button className="card__like-button-hidden" />
        )}
      </div>
      <img
        src={item.imageUrl}
        className="card__image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
