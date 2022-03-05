import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Login({ onLogin, onResponce }) {
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
    auth
      .authorize(values.password, values.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          onLogin(values.email);
          navigate("/");
          setValues({
            password: "",
            email: "",
          });
        } else {onResponce(false)}
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <h3 className="login-container__title">Вход</h3>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
