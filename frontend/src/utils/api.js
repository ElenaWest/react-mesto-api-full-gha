class Api {
    constructor(parameter) {
        this._url = parameter.baseUrl;
        // this._headers = parameter.headers;
        // this._authorization = parameter.headers.authorization;
    }

    _checkResponse(res) {        
    return res.ok ? res.json() : Promise.reject(`Ошибка сервера ${res.status}`);
    }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
        .then(this._checkResponse)
      }

    getInfo(token) {
        return this._request(`/users/me`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
    }

    getCards(token) {
        return this._request(`/cards`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
    }

    setUserInfo(data, token) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.username,
                about: data.status,
            })
        })
    }

    setNewAvatar(data, token) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
    }
    
    addCard(data, token) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link,
        })
      })
    }

    addLike(cardId, token) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
    }

    deleteLike(cardId, token) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
    }

    deleteCard(cardId, token) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`
            } 
        })
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.elenavasilenko.nomoredomainsicu.ru',
    // headers: {
    //   authorization: '0c26d4a4-f51e-405b-92e1-f55fac7bf350',
    //   'Content-Type': 'application/json'
    // }
});

export default api;