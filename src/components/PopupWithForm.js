import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({ popup, handleSubmitForm }) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._button = this._form.querySelectorAll('.popup__submit-btn');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

    changeHandleSubmitForm(newHandleSubmitForm) {
        this._handleSubmitForm = newHandleSubmitForm;
    }

    submitButtonText(text) {
        this._button.textContent = text
        console.log(text);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;