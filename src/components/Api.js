class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserData() {
        return fetch(`${this._url}/users/me`,
            {
                headers: this._headers
            })
            .then(res => this._getResponse(res))
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(res => this._getResponse(res))
    }

    editProfile(name, job) {
        return fetch(`${this._url}/users/me`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: job,
                })
            })
            .then(res => this._getResponse(res))
    }

    createCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then(res => this._getResponse(res))
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => this._getResponse(res))
    }

    likeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`,
            {
                method: "PUT",
                headers: this._headers,
            })
            .then(res => this._getResponse(res))
    }

    dislikeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`,
            {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => this._getResponse(res))
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: url
                })
            })
            .then(res => this._getResponse(res))
    }
}

export default Api;
