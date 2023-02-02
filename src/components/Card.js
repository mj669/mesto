class Card {
    constructor({ data, templateSelector, handleCardClick, handleDeleteCard, handleLikeCard, userId }) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._templateSelector = templateSelector;
        this._newCard = this._getTemplate();
        this._imageElement = this._newCard.querySelector('.gallery__image');
        this._likeButton = this._newCard.querySelector('.gallery__like');
        this._likesCounter = this._newCard.querySelector('.gallery__like-counter');
        this._deleteButton = this._newCard.querySelector('.gallery__delete_active');
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.gallery__card').cloneNode(true);

        return card;
    }

    _setData() {
        const titleElement = this._newCard.querySelector('.gallery__title');
        titleElement.textContent = this._name;

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
    }

    delete() {
        this._newCard.remove();
        this._newCard = null;
    }

    _showButtonDelete() {
        if (this._userId !== this._ownerId) {
            this._deleteButton.style.display = 'none'
        };
    }

    isLikeCard() {
        return this._likes.some(elem => elem._id === this._userId)
    }

    _activateLike() {
        this._likeButton.classList.add('gallery__like_active');
    }

    _disactivateLike() {
        this._likeButton.classList.remove('gallery__like_active');
    }

    setLikes(newLikes) {
        this._likes = newLikes
        this._likesCounter.textContent = this._likes.length;

        !this.isLikeCard() ? this._activateLike() : this._disactivateLike();
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => { this._handleDeleteCard(this._id) });

        this._likeButton.addEventListener('click', () => { this._handleLikeCard(this._id) });

        this._imageElement.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
    }

    getView() {
        this._setData();
        this._setEventListeners();
        this.setLikes(this._likes);
        this._showButtonDelete();

        return this._newCard;
    }
}

export default Card;