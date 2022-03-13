export const apiConfig = {
  baseUrl: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._cardsUrl = `${apiConfig.baseUrl}/cards/`;
    this._userUrl = `${apiConfig.baseUrl}/users/me/`;
    this._headers = apiConfig.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getCardsData() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(this._userUrl, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  postCardData(newName, newLink) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  changeCardLikeStatus(itemId, status) {
    const method = status === true ? "DElETE" : "PUT";
    return fetch(`${this._cardsUrl}likes/${itemId}`, {
      method: method,
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  patchAvatar(avatarInfo) {
    return fetch(`${this._userUrl}avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ avatar: avatarInfo }),
    }).then(this._checkResponse);
  }
}

// Instance of Api class

const api = new Api(apiConfig);
export default api;
