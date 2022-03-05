import React from "react";
import Popup from "./Popup.js";

function PopupWithForm(props) {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <h3 className="popup__title">{props.title}</h3>
      <form className="form" name={props.name} onSubmit={props.onSubmit}>
        {props.children}
        <button type="submit" className="form__save-button">
          {props.buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
