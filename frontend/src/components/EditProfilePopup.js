import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import {
  CurrentUserContext,
  currentUser,
} from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setNameState] = React.useState("");
  const [description, setDescriptionState] = React.useState("");

  React.useEffect(() => {
    setNameState(currentUser.name);
    setDescriptionState(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setNameState(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescriptionState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      isOpen={props.isOpen}
      name={props.name}
      onClose={props.onClose}
    >
      <label className="form__field">
        <input
          className="form__input"
          type="text"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={`${name}`}
          onChange={handleNameChange}
        />
        <span className="form__input-error" id="name-alert"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input"
          type="text"
          id="job"
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
          required
          value={`${description}`}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error" id="job-alert"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
