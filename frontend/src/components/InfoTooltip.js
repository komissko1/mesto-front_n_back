import React from "react";
import Popup from "./Popup.js";
import yesIcon from '../images/icon-yes.svg';
import noIcon from '../images/icon-no.svg';

function InfoTooltip(props) {
  return (
    <Popup isOpen={props.openState.isOpen} name={props.name} onClose={props.onClose}>
        <img
          className="popup__icon"
          src={props.openState.result ? yesIcon : noIcon}
          alt={props.name}
        />
      <p className="popup__title popup__title_centered">{props.openState.result
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
      </p>
    </Popup>
  );
}

export default InfoTooltip;
