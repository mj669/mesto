const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = popupElem.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.profile__title');
const jobeInput = document.querySelector('.profile__subtitle');
const namePopup = document.querySelector('.popup__text_type_name');
const jobePopup = document.querySelector('.popup__text_type_about');

function openPopup () {
    popupElem.classList.add('popup_opened');
}

function closePopup () {
    popupElem.classList.remove('popup_opened');
}

function writingProfileData () {
    nameInput;
    jobeInput;
    namePopup;
    jobePopup;
    namePopup.value = nameInput.textContent;
    jobePopup.value = jobeInput.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput;
    jobeInput;
    namePopup;
    jobePopup;
    nameInput.textContent = namePopup.value;
    jobeInput.textContent = jobePopup.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

editElem.addEventListener('click', openPopup);

editElem.addEventListener('click', writingProfileData);

popupCloseElem.addEventListener('click', closePopup);