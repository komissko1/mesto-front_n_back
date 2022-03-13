import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import api from "../utils/api.js";
import Main from "./Main.js";
import Login from "./Login.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRout.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth";

function App() {
  const [avatarPopupState, setAvatarPopupState] = React.useState(false);
  const [editPopupState, setEditPopupState] = React.useState(false);
  const [addPopupState, setAddPopupState] = React.useState(false);
  const [imagePopupState, setImagePopupState] = React.useState(false);
  const [infoPopupState, setInfoPopupState] = React.useState({
    isOpen: false,
    result: false,
  });
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTockenCheck(location.pathname);
  }, []);

  const handleTockenCheck = (path) => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getToken(jwt).then((res) => {
        if (res) {
          handleLogin(res.email);
          navigate(path);
        }
      });
    }
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
  };

  function handleInfoTooltip(result) {
    setInfoPopupState({ isOpen: true, result: result });
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getCardsData()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    };
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setAvatarPopupState(!avatarPopupState);
  }

  function handleEditProfileClick() {
    setEditPopupState(!editPopupState);
  }

  function handleAddPlaceClick() {
    setAddPopupState(!addPopupState);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(!imagePopupState);
  }

  function handleUpdateUser(name, description) {
    api
      .patchUserData(name, description)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(url) {
    api
      .patchAvatar(url)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, url) {
    api
      .postCardData(name, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setAvatarPopupState(false);
    setEditPopupState(false);
    setAddPopupState(false);
    setImagePopupState(false);
    setInfoPopupState({ isOpen: false, result: false });
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardData(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        <Header
          email={userEmail}
          location={location.pathname}
          loggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLogin} onResponce={handleInfoTooltip} />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onResponce={handleInfoTooltip} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </div>

      <EditAvatarPopup
        name="avatar"
        isOpen={avatarPopupState}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        name="edit"
        isOpen={editPopupState}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        name="add"
        isOpen={addPopupState}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        name="image"
        isOpen={imagePopupState}
        onClose={closeAllPopups}
        card={selectedCard}
      />

      <InfoTooltip
        name="register"
        isOpen={infoPopupState.isOpen}
        icon={infoPopupState.result}
        message={
          infoPopupState.result
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."
        }
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
