import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRout.js";
import logoPath from "../images/logo.svg";

function Header(props) {
  return (
    <header className="page-header">
      <a href="https://yandex.ru/">
        <img
          className="page-header__logo link-effect"
          src={logoPath}
          alt="Место"
        />
      </a>
      <div className="page-header__navBar">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={props.loggedIn}>
                <p className="page-header__nav-item">{props.email}</p>
                <Link
                  to="/sign-in"
                  className="page-header__nav-item link-effect"
                  onClick={props.onLogout}
                >
                  Выйти
                </Link>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="page-header__nav-item link-effect">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="page-header__nav-item link-effect">
                Вход
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
