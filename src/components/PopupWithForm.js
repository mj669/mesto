import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({popup, handleSubmitForm}) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
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