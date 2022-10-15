import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register.js';
import Login from './Login.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrenUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  };
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
  }

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(newInfo){
    api.changeUserInfo(newInfo)
      .then((data) => {
        setCurrenUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Ошибка при обновлнии данных пользователя: ${err}`);
      });
  }

  function handleUpdateAvatar(avatarLink, setIsSubmitted) {
    api.changeAvatar(avatarLink)
      .then((data) => {
        setCurrenUser(data);
        closeAllPopups();
      })
      .then(() => {
        setIsSubmitted(true)
      })
      .catch((err) => {
        alert(`Ошибка при смене аватара: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        alert(`Ошибка при клике на лайк: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(el => el._id !== card._id));
      })
      .catch((err) => {
        alert(`Ошибка при удалении карточки: ${err}`);
      })
  }

  function handleAddPlaceSubmit(newCardInfo, setIsSubmitted) {
    api.createNewCard(newCardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .then(() => {
        setIsSubmitted(true)
      })
      .catch((err) => {
        alert(`Ошибка при создании новой карточки: ${err}`);
      })
  }

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err)=> {
        alert(`Ошибка при загрузке массива карточек: ${err}`)
      });

    api.getServerUserInfo()
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        alert(`Ошибка при загрузке информации профиля: ${err}`);
      });
  }, [])

  return (
  <div className="page">
    <Header />
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        {/* <ProtectedRoute
          path="/"
          // loggedIn
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        /> */}
        <Route exact path="/">
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
      </Switch>
      <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
      />
    </CurrentUserContext.Provider>
    <Footer />
  </div>
  );
}

export default App;
