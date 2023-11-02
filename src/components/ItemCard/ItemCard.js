import "./ItemCard.css";
import unliked_button from "../../images/unliked_button.svg";
import liked_button from "../../images/liked_button.svg";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({
  item,
  onSelectCard,
  selectedCard,
  onCardLike,
  loggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const cardId = item._id;
  const userId = currentUser ? currentUser._id : "";

  // Check if the item was liked by the current user.The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const likeButtonClassName = isLiked
    ? "card__like-button card__like-button-active"
    : "card__like-button ";

  // Like button src
  // const itemLikeButtonSrc = `${isLiked ? liked_button : unliked_button}`;

  // // Check if user is authorized
  // let isAuthorized = false;
  // if (currentUser !== "") {
  //   isAuthorized = true;
  // } else {
  //   isAuthorized = false;
  // }

  // // like button className variable
  // const cardLikeButton = `card_like-button ${
  //   isAuthorized ? "card_like-button_visible" : "card_like-button_hidden"
  // }`;

  const handleLikeClick = () => {
    onCardLike({ _id: cardId, isLiked: isLiked, user: userId });
  };

  // return (
  //   <div className="card__element">
  //     <div>
  //       <img
  //         src={item.link}
  //         alt={item.name}
  //         className="card__image"
  //         onClick={() => onSelectCard(item)}
  //       />
  //       <div className="card__title">
  //         <p className="card__name">{item.name}</p>
  //         <img
  //           className={cardLikeButton}
  //           src={itemLikeButtonSrc}
  //           onClick={() => onCardLike(item._id, isLiked, currentUser)}
  //           alt={item.name}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

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
          <button className="card__like-button_hidden" />
        )}
      </div>
      <img
        src={item.link}
        className="card__image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
