class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  createCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.title,
        link: card.link
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._getResponseData)
  }

  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._getResponseData)
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.likeCard(id)
    } else {
      return this.dislikeCard(id)
    }
    //isLiked ? this.likeCard(id) : this.dislikeCard(id);
    // не пойму почему выдает ошибку, когда тернарка
  }

  setAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar),
    })
      .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "006bb176-a176-4c97-bbc5-cf71d72d94bc",
    "content-type": "application/json",
  }
});

export default api;