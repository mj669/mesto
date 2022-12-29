//Import

import {initialCards} from './cards.js';
import Card from './Card.js';
import {selectorList} from './data.js';
import FormValidator from './FormValidator.js';



// Открыть/закрыть модальное окно

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}



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
    const newCardData = createCard({ link: linkPlacePopup.value, name: namePlacePopup.value });
    renderCard(newCardData);
    evt.target.reset();
    closePopup(popupAddCard);
}

const createCard = (dataCard) => {
    const card = new Card(dataCard, '.card-template_type_default', handleOpenPopup);
    return card.getView();
};

const renderCard = (card) => {
    galleryContainer.prepend(card);
};

initialCards.forEach((item) => {
    const card = createCard(item);
    renderCard(card);
});

cardForm.addEventListener('submit', handleSubmitAddForm);

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));



// Просмотр изображения

const popupImgMain = document.querySelector('.popup_type_view-img');
const popupImgElem = popupImgMain.querySelector('.popup__img');
const popupTitle = popupImgMain.querySelector('.popup__figcaption');

function handleOpenPopup(name, link) {
    popupImgElem.src = link;
    popupImgElem.alt = name;
    popupTitle.textContent = name;
    openPopup(popupImgMain);
}



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



// Закрытие модального окна Esc

const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector(".popup_opened"));
    };
};



// Валидация форм

const validationFormEditProfile = new FormValidator(selectorList, profileForm);
validationFormEditProfile.enableValidation();
validationFormEditProfile.resetValidation();

const validationFormAddCard = new FormValidator(selectorList, cardForm);
validationFormAddCard.enableValidation();
validationFormAddCard.resetValidation();