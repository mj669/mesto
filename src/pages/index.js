import {
    selectorList,
    btnOpenEditProfile,
    profileForm,
    nameInput,
    jobeInput,
    btnAddCard,
    cardForm,
    changeAvatarButton,
    changeAvatarForm,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import '../pages/index.css';



const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-58',
    headers: {
        authorization: '7045cafe-3b85-4c5a-8eec-e8066aee908b',
        'Content-Type': 'application/json'
    }
});

// Профиль

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.profile__image'
});

// Загрузка информации о пользователе и карточек с сервера

Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            name: userData.name,
            job: userData.about,
            id: userData._id,
        });
        userInfo.setUserAvatar({
            avatar: userData.avatar
        });
        renderCard.renderItems(cards);
    })
    .catch(err => {
        console.log(`Ошибка.....: ${err}`)
    });

// Карточка

const popopImageData = new PopupWithImage('.popup_type_view-img');
popopImageData.setEventListeners();

// Отрисовка начального массива карточек

const renderCard = new Section(
    (item) => {
        renderCard.addItem(createCard(item));
    },
    '.gallery'
);

// Модальное окно редактирования профиля

const popupEditForm = new PopupWithForm({
    popup: '.popup_type_edit-profile',
    handleSubmitForm: (values) => {
        popupEditForm.submitButtonText('Сохранение...');
        api.editProfile(values['name'], values['about'])
            .then(() => {
                userInfo.setUserInfo({
                    name: values['name'],
                    job: values['about'],
                });
                popupEditForm.close();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            })
            .finally(() => { 
                popupEditForm.submitButtonText('Сохранить') 
            })
    }
});
popupEditForm.setEventListeners();

// Модальное окно добавления карточки

const popupAddForm = new PopupWithForm({
    popup: '.popup_type_add-card',
    handleSubmitForm: (values) => {
        popupAddForm.submitButtonText('Сохранение...');
        api.createCard(values['title'], values['link'])
            .then((res) => {
                renderCard.addItem(createCard(res));
                popupAddForm.close();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            })
            .finally(() => { 
                popupAddForm.submitButtonText('Создать') 
            })
    }
});
popupAddForm.setEventListeners();

const popupDeleteConfirm = new PopupWithForm({
    popup: '.popup_type_delete-card'
});
popupDeleteConfirm.setEventListeners();

// Модальное окно редактирования аватара

const popupChangeAvatarForm = new PopupWithForm({
    popup: '.popup_type_change-avatar',
    handleSubmitForm: (value) => {
        popupChangeAvatarForm.submitButtonText('Сохранение...');
        api.changeAvatar(value['avatar'])
            .then((res) => {
                userInfo.setUserAvatar(res);
                popupChangeAvatarForm.close();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            })
            .finally(() => { 
                popupChangeAvatarForm.submitButtonText('Сохранить') 
            })
    }
})
popupChangeAvatarForm.setEventListeners();

// Создание карточки

function createCard(item) {
    const card = new Card({
        data: item,
        templateSelector: '.card-template_type_default',
        handleCardClick: () => {
            popopImageData.open(item)
        },
        handleDeleteCard: (id) => {
            popupDeleteConfirm.open()
            popupDeleteConfirm.changeHandleSubmitForm(() => {
                popupDeleteConfirm.submitButtonText('Удаление...');
                api.deleteCard(id)
                    .then(() => {
                        card.delete();
                        popupDeleteConfirm.close()
                    })
                    .catch(err => {
                        console.log(`Ошибка.....: ${err}`)
                    })
                    .finally(() => { 
                        popupDeleteConfirm.submitButtonText('Да') 
                    })
            })
        },
        handleLikeCard: (id) => {
            if (card.isLikeCard()) {
                api.dislikeCard(id)
                    .then((res) => card.setLikes(res.likes))
                    .catch(err => {
                        console.log(`Ошибка.....: ${err}`)
                    })
            } else {
                api.likeCard(id)
                    .then((res) => card.setLikes(res.likes))
                    .catch(err => {
                        console.log(`Ошибка.....: ${err}`)
                    })
            }
        },
        userId: userInfo.getUserInfo().id
    });
    return card.getView();
}

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

// Открытие модального окна редактирования аватара

changeAvatarButton.addEventListener('click', () => {
    popupChangeAvatarForm.open();
    validationFormChangeAvatar.resetValidation();
});

// Валидация форм

const validationFormEditProfile = new FormValidator(selectorList, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(selectorList, cardForm);
validationFormAddCard.enableValidation();

const validationFormChangeAvatar = new FormValidator(selectorList, changeAvatarForm);
validationFormChangeAvatar.enableValidation();
