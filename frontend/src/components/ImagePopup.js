import React from "react";
import Popup from "./Popup.js";

function ImagePopup(props) {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      {props.card.link && (
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
      )}
      <p className="popup__img-title">{props.card.name}</p>
    </Popup>
  );
}

export default ImagePopup;
