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
    writingProfileData ();
}

function closePopup () {
    popupElem.classList.remove('popup_opened');
}

function writingProfileData () {
    jobeInput;
    namePopup;
    jobePopup;
    namePopup.value = nameInput.textContent;
    jobePopup.value = jobeInput.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    jobeInput;
    namePopup;
    jobePopup;
    nameInput.textContent = namePopup.value;
    jobeInput.textContent = jobePopup.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

editElem.addEventListener('click', openPopup,);

popupCloseElem.addEventListener('click', closePopup);