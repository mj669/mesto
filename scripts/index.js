//Import

import {initialCards} from './cards.js';
import Card from './Card.js';
import {selectorList} from './data.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';



// Pop-up Редактирования профиля

const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileForm = document.forms['profile-form'];
const nameProfile = document.querySelector('.profile__title');
const jobeProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobeInput = document.querySelector('.popup__text_type_about');

function fillProfileInputs() {
    nameInput.value = nameProfile.textContent;
    jobeInput.value = jobeProfile.textContent;
}

function handleSubmitEditForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobeProfile.textContent = jobeInput.value;
    closePopup(popupEditProfile);
}

profileForm.addEventListener('submit', handleSubmitEditForm);

btnOpenEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    fillProfileInputs();
});



// Работа с Card

const btnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const galleryContainer = document.querySelector('.gallery');
const cardForm = document.forms['card-form'];
const namePlacePopup = document.querySelector('.popup__text_type_title');
const linkPlacePopup = document.querySelector('.popup__text_type_link');

function handleSubmitAddForm(evt) {
    evt.preventDefault();
    const newCardData = { link: linkPlacePopup.value, name: namePlacePopup.value };
    renderCard(newCardData);
    evt.target.reset();
    closePopup(popupAddCard);
}

const renderCard = (dataCard) => {
    const card = new Card(dataCard);
    galleryContainer.prepend(card.getView());
};

initialCards.forEach(renderCard);

cardForm.addEventListener('submit', handleSubmitAddForm);

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));



// Закрытие модального окна X

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});



// Закрытие модального окна Overlay

const popupElems = document.querySelectorAll('.popup');

popupElems.forEach((elem) => {
    elem.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(elem);
        }
    });
});



// Валидация форм

const validationFormEditProfile = new FormValidator(selectorList, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(selectorList, cardForm);
validationFormAddCard.enableValidation();