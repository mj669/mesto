// Pop-up Редактирования профиля

const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileForm = document.forms['profile-form'];
const nameProfile = document.querySelector('.profile__title');
const jobeProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobeInput = document.querySelector('.popup__text_type_about');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

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
const btnDeleteCard = document.querySelector('.gallery__delete');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.gallery__card');

const handleDeleteCard = (evt) => {
    evt.target.closest('.gallery__card').remove();
};

const handleLikeCard = (evt) => {
    evt.target.closest('.gallery__like').classList.toggle('gallery__like_active');
};

const generateCard = (dataCard) => {
    const newCard = cardTemplate.cloneNode(true);

    const title = newCard.querySelector('.gallery__title');
    title.textContent = dataCard.name;
    
    const image = newCard.querySelector('.gallery__image');
    image.src = dataCard.link;
    image.alt = dataCard.name;

    setEventOnImg(image);

    const deleteButtonActive = newCard.querySelector('.gallery__delete_active');
    deleteButtonActive.addEventListener('click', handleDeleteCard);

    const likeButtonActive = newCard.querySelector('.gallery__like_active');
    likeButtonActive.addEventListener('click', handleLikeCard);

    return newCard;
};

function handleSubmitAddForm(evt) {
    evt.preventDefault();
    const newCardData = { link: linkPlacePopup.value, name: namePlacePopup.value };
    renderCard(newCardData);
    evt.target.reset();
    closePopup(popupAddCard);
}

const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
};

initialCards.forEach(renderCard);

cardForm.addEventListener('submit', handleSubmitAddForm);

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));



// Просмотр изображения

const popupImgMain = document.querySelector('.popup_type_view-img');
//const btnCloseImg = document.querySelector('.popup__close-view');
const popupImgElem = popupImgMain.querySelector('.popup__img');
const popupTitle = popupImgMain.querySelector('.popup__figcaption');

function setEventOnImg(item) {
    item.addEventListener('click', (evt) => {
        openImgPopup(evt.target);
    });
}

function closeImgPopup() {
    popupImgElem.src = '';
    popupImgElem.alt = '';
    popupTitle.textContent = '';
    closePopup(popupImgMain);
}

function openImgPopup(imgItem) {
    popupImgElem.src = imgItem.src;
    popupImgElem.alt = imgItem.alt;
    popupTitle.textContent = imgItem.alt;
    openPopup(popupImgMain);
}



// Закрытие модального окна X

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});



// Закрытие модального окна Esc

const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector(".popup_opened"));
    };
};



// Закрытие модального окна Overlay

const popupElems = document.querySelectorAll('.popup');

popupElems.forEach((elem) => {
    elem.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(elem);
        }
    });
});
