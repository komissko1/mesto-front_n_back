import React from "react";
import {
  CurrentUserContext,
  currentUser,
} from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__trash-button link-effect ${
    isOwn ? "" : "place__trash-button_inactive"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "" : "place__like-button_inactive"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="place">
      <button
        type="button"
        className="place__image-button"
        onClick={handleClick}
      >
        <img
          className="place__image"
          src={props.card.link}
          alt={props.card.name}
        />
      </button>
      <div className="place__caption">
        <h2 className="place__name">{props.card.name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p className={"place__like-counter"}>{props.card.likes.length}</p>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
