export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export const selectorList = {
    formSelector: '.form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
};


// Pop-up Редактирования профиля

export const btnOpenEditProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const profileForm = document.forms['profile-form'];
export const nameProfile = document.querySelector('.profile__title');
export const jobeProfile = document.querySelector('.profile__subtitle');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobeInput = document.querySelector('.popup__text_type_about');


// Работа с Card

export const btnAddCard = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const cardForm = document.forms['card-form'];

// Просмотр изображения

export const popupImgMain = document.querySelector('.popup_type_view-img');