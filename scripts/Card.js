import {openPopup} from './utils.js';

class Card {
    constructor({name, link}) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const card = document.querySelector('#card-template').content.querySelector('.gallery__card').cloneNode(true);

        return card;
    }

    _setData() {
        const titleElement = this._newCard.querySelector('.gallery__title');
        titleElement.textContent = this._name;
    }

    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _likeCard() {
        const likeButton = this._newCard.querySelector('.gallery__like');
        likeButton.classList.toggle('gallery__like_active');
    }

    _openImgPopup() {
        const popupImgMain = document.querySelector('.popup_type_view-img');
        const popupImgElem = popupImgMain.querySelector('.popup__img');
        const popupTitle = popupImgMain.querySelector('.popup__figcaption');
        popupImgElem.src = this._link;
        popupImgElem.alt = this._name;
        popupTitle.textContent = this._name;
        openPopup(popupImgMain);
    }

    _setEventListeners() {
        const deleteButtonActive = this._newCard.querySelector('.gallery__delete_active');
        deleteButtonActive.addEventListener('click', () => {this._deleteCard()});

        const likeButtonActive = this._newCard.querySelector('.gallery__like_active');
        likeButtonActive.addEventListener('click', () => {this._likeCard()});

        const imageElement = this._newCard.querySelector('.gallery__image');
        imageElement.src = this._link;
        imageElement.alt = this._name;

        imageElement.addEventListener('click', () => {this._openImgPopup()});
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }
}

export default Card;