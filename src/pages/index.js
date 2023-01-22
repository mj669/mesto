//Import

import {
    initialCards,
    selectorList,
    btnOpenEditProfile,
    popupEditProfile,
    profileForm,
    nameProfile,
    jobeProfile,
    nameInput,
    jobeInput,
    btnAddCard,
    popupAddCard,
    cardForm,
    popupImgMain,
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
    name: nameProfile,
    job: jobeProfile
});

// Карточка

const popopImageData = new PopupWithImage(popupImgMain);
popopImageData.setEventListeners();

// Модальное окно редактирования профиля

const popupEditForm = new PopupWithForm({
    popup: popupEditProfile,
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
    popup: popupAddCard,
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
