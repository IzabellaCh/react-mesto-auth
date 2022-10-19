const baseUrl = 'https://auth.nomoreparties.co';

class Authorisation {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }
  
  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._checkResponse)
  }

  login(email, password) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._checkResponse)
  }

  checkToken(jwt) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(this._checkResponse)
  }
}

export const authorisation = new Authorisation({
  baseUrl: 'https://auth.nomoreparties.co',
});