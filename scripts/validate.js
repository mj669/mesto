// Валидация форм

enableValidation(selectorList);

function showError(formElement, inputElement, errorMessage, selectorList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorList.errorClass);
}

function hideError(formElement, inputElement, selectorList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorList.inputErrorClass);
    errorElement.classList.remove(selectorList.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, selectorList);
    } else {
        hideError(formElement, inputElement, selectorList);
    }
}

function setEventListeners(formElement, selectorList) {
    const inputList = Array.from(formElement.querySelectorAll(selectorList.inputSelector));
    const buttonElement = formElement.querySelector(selectorList.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorList);
    document.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, selectorList);
        }, 0);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, selectorList);
            toggleButtonState(inputList, buttonElement, selectorList);
        });
    });
}

function enableValidation(selectorList) {
    const formList = Array.from(document.querySelectorAll(selectorList.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, selectorList);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
}

function toggleButtonState(inputList, buttonElement, selectorList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectorList.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(selectorList.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
    };
}
