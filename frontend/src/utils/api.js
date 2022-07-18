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

  _headersWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this.headers}
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
       headers: this._headersWithJwt(),
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
       headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }

  createCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
       headers: this._headersWithJwt(),
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
       headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }

  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
       headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
       headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.likeCard(id)
    } else {
      return this.dislikeCard(id)
    }
  }

  setAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
       headers: this._headersWithJwt(),
      body: JSON.stringify(avatar),
    })
      .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-type": "application/json",
    'Accept': 'application/json',
  }
});

export default api;