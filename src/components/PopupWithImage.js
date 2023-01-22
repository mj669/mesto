import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImgElem = this._popup.querySelector('.popup__img'); 
        this._popupTitle = this._popup.querySelector('.popup__figcaption'); 
    }

    open(item) {
        super.open();
        this._popupImgElem.src = item.link; 
        this._popupImgElem.alt = item.name; 
        this._popupTitle.textContent = item.name; 
    }
}

export default PopupWithImage;