//Import

import {
    initialCards,
    selectorList,
    btnOpenEditProfile,
    profileForm,
    nameInput,
    jobeInput,
    btnAddCard,
    cardForm,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';



// Профиль

const userInfo = new UserInfo({
    name: '.profile__title',
    job: '.profile__subtitle'
});

// Карточка

const popopImageData = new PopupWithImage('.popup_type_view-img');
popopImageData.setEventListeners();

// Модальное окно редактирования профиля

const popupEditForm = new PopupWithForm({
    popup: '.popup_type_edit-profile',
    handleSubmitForm: (values) => {
        userInfo.setUserInfo({
            name: values['name'],
            job: values['about'],
        });
        popupEditForm.close();
    }
});
popupEditForm.setEventListeners();

// Модальное окно добавления карточки

const popupAddForm = new PopupWithForm({
    popup: '.popup_type_add-card',
    handleSubmitForm: (values) => {
        const obj = {
            name: values['title'],
            link: values['link'],
        };
        renderCard.addItem(createCard(obj));
        popupAddForm.close();
    }
});
popupAddForm.setEventListeners();

// Создание карточки

function createCard(item) {
    const card = new Card({
        data: item,
        templateSelector: '.card-template_type_default',
        handleCardClick: () => {
            popopImageData.open(item)
        }
    });
    return card.getView();
}

// Отрисовка начального массива карточек

const renderCard = new Section({
    items: initialCards,
    renderer: (item) => {
        renderCard.addItem(createCard(item));
    }
}, '.gallery');
renderCard.renderItems();

// Открытие модального окна редактирования профиля

btnOpenEditProfile.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    popupEditForm.open();
    nameInput.value = name;
    jobeInput.value = job;
    validationFormEditProfile.resetValidation();
});

// Открытие модального окна добавления карточки

btnAddCard.addEventListener('click', () => {
    popupAddForm.open();
    validationFormAddCard.resetValidation();
});

// Валидация форм

const validationFormEditProfile = new FormValidator(selectorList, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(selectorList, cardForm);
validationFormAddCard.enableValidation();
