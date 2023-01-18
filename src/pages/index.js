//Import

import '../pages/index.css';

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
    galleryContainer,
    cardForm,
    popupImgMain,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



// Профиль

const userInfo = new UserInfo(nameProfile, jobeProfile);

// Карточка

const popopImageData = new PopupWithImage(popupImgMain);
popopImageData.setEventListeners();

// Модальное окно редактирования профиля

const popupEditForm = new PopupWithForm({
    popupSelector: popupEditProfile,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
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
    popupSelector: popupAddCard,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        const obj = {
            name: values['title'],
            link: values['link'],
        };
        const newCard = new Card({
            name: values['title'],
            link: values['link'],
        }, '.card-template_type_default',
        () => {
            popopImageData.open(obj)
        });
        galleryContainer.prepend(newCard.getView());
        popupAddForm.close();
    }
});
popupAddForm.setEventListeners();

// Отрисовка начального массива карточек

const renderCard = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card({
            name: data.name,
            link: data.link,
        }, '.card-template_type_default', 
        () => {
            popopImageData.open(data);
        });
        renderCard.addItem(card.getView());
    }
}, galleryContainer);
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
