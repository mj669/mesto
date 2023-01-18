import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmitForm}) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            localStorage.setItem('img', 123);
            this._handleSubmitForm(evt, this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;