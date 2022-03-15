const apiConfig = {
  baseUrl: 'http://localhost:3000',
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._cardsUrl = `${apiConfig.baseUrl}/cards/`;
    this._userUrl = `${apiConfig.baseUrl}/users/me/`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getCardsData() {
    return fetch(this._cardsUrl, {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(this._userUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
    }).then(this._checkResponse);
  }

  postCardData(newName, newLink) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
      body: JSON.stringify({
        name: newName,
        link: newLink,
      }),
    }).then(this._checkResponse);
  }

  patchUserData(newName, newJob) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    }).then(this._checkResponse);
  }

  deleteCardData(itemId) {
    return fetch(`${this._cardsUrl}${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
    }).then(this._checkResponse);
  }

  changeCardLikeStatus(itemId, status) {
    const method = status === true ? "DElETE" : "PUT";
    return fetch(`${this._cardsUrl}likes/${itemId}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
    }).then(this._checkResponse);
  }

  patchAvatar(avatarInfo) {
    return fetch(`${this._userUrl}avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
      body: JSON.stringify({ avatar: avatarInfo }),
    }).then(this._checkResponse);
  }
}

// Instance of Api class

const api = new Api(apiConfig);
export default api;
