class Card {
    constructor({name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._newCard = this._getTemplate();
        this._imageElement = this._newCard.querySelector('.gallery__image');
        this._likeButton = this._newCard.querySelector('.gallery__like');
        this._handleCardClick = handleCardClick;
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

    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _likeCard() {
        this._likeButton.classList.toggle('gallery__like_active');
    }

    _setEventListeners() {
        const deleteButtonActive = this._newCard.querySelector('.gallery__delete_active');
        deleteButtonActive.addEventListener('click', () => {this._deleteCard()});

        this._likeButton.addEventListener('click', () => {this._likeCard()});

        this._imageElement.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
    }

    getView() {
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }
}

export default Card;