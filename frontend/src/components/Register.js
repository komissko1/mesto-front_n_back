import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Register(props) {
  const [values, setValues] = React.useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(values.password, values.email)
    .then((res) => {
      if (res.email) {
        navigate("/sign-in");
        props.onResponce(true);
      } else{
        props.onResponce(false)};
      })
    .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <h3 className="login-container__title">Регистрация</h3>
      <form className="form dark-mode" onSubmit={handleSubmit}>
        <label className="form__field">
          <input
            className="form__input form__input_dark-mode"
            type="text"
            id="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <span className="form__input-error" id="name-alert"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_dark-mode"
            type="password"
            id="password"
            placeholder="Пароль"
            minLength="3"
            maxLength="20"
            required
            value={values.password}
            onChange={handleChange}
          />
          <span className="form__input-error" id="job-alert"></span>
        </label>
        <button
          type="submit"
          className="form__save-button form__save-button_dark-mode"
        >
          Зарегистрироваться
        </button>
      </form>
      <p>
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login-container__link link-effect">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
