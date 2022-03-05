import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__user">
          <button
            onClick={props.onEditAvatar}
            type="button"
            aria-label="Редактировать"
            className="profile__avatar-button"
          ></button>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__user-foto"
          />
          <div className="profile__user-info">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="profile__edit-button button-effect"
            ></button>
            <p className="profile__user-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          aria-label="Добавить"
          className="profile__add-button button-effect"
        ></button>
      </section>

      <section className="places content__places" aria-label="Места">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
