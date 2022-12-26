class FormValidator {
    constructor(selectorList, getForm) {
        this._formSelector = selectorList.formSelector;
        this._inputSelector = selectorList.inputSelector;
        this._submitButtonSelector = selectorList.submitButtonSelector;
        this._inactiveButtonClass = selectorList.inactiveButtonClass;
        this._inputErrorClass = selectorList.inputErrorClass;
        this._errorClass = selectorList.errorClass;
        this._getForm = getForm;
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._getForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._getForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._getForm.querySelectorAll(this._inputSelector));
        const buttonElement = this._getForm.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        this._getForm.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement);
            }, 0);
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setEventListeners(formElement);
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        }); 
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled', '');
        };
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export default FormValidator;