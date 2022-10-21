class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // запрос для получения информации о пользователе
  getServerUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

// запрос для создания массива карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

//   запрос для изменения информации из формы
  changeUserInfo(newInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.name,
        about: newInfo.about
      })
    })
    .then(this._checkResponse)
  }

  // запрос для создания новой карточки
  createNewCard(newCardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardInfo.name,
        link: newCardInfo.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardInfo) {
    return fetch(`${this._baseUrl}/cards/${cardInfo}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(this._checkResponse)
    }
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
      })
    .then(this._checkResponse)
  }
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'adc94622-2d1b-46ad-9b64-72eed6ee2b47',
    'Content-Type': 'application/json'
  },
});

