// Валидация форм

enableValidation(selectorList);

function showError(formElement, inputElement, errorMessage, selectorList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorList.errorClass);
};

function hideError(formElement, inputElement, selectorList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorList.inputErrorClass);
    errorElement.classList.remove(selectorList.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, selectorList);
    } else {
        hideError(formElement, inputElement, selectorList);
    }
};

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(selectorList.inputSelector));
    const buttonElement = formElement.querySelector(selectorList.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, selectorList);
        });
    });
};

function enableValidation(selectorList) {
    const formList = Array.from(document.querySelectorAll(selectorList.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        }); 
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
};

function toggleButtonState(inputList, buttonElement, selectorList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectorList.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(selectorList.inactiveButtonClass);
    };
};

