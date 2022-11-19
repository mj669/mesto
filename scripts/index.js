// Pop-up Редактирования профиля

const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const bntCloseEditProfile = document.querySelector('.popup__close-edit');
const formEditProfile = document.querySelector('.form_type_edit');
const nameProfile = document.querySelector('.profile__title');
const jobeProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobeInput = document.querySelector('.popup__text_type_about');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function writingProfileData() {
    nameInput.value = nameProfile.textContent;
    jobeInput.value = jobeProfile.textContent;
}

function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobeProfile.textContent = jobeInput.value;
    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

btnOpenEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    writingProfileData();
});

bntCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));



// Работа с Card

const btnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const btnCloseCard = document.querySelector('.popup__close-add');
const galleryContainer = document.querySelector('.gallery');
const formAddCard = document.querySelector('.form_type_add');
const namePlacePopup = document.querySelector('.popup__text_type_title');
const linkPlacePopup = document.querySelector('.popup__text_type_link');
const btnDeleteCard = document.querySelector('.gallery__delete');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.gallery__card');

const deleteCardHandler = (evt) => {
    evt.target.closest('.gallery__card').remove();
};

const likeCardHandler = (evt) => {
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
    deleteButtonActive.addEventListener('click', deleteCardHandler);

    const likeButtonActive = newCard.querySelector('.gallery__like_active');
    likeButtonActive.addEventListener('click', likeCardHandler);

    return newCard;
};

function formAddCardSubmitHandler(evt) {
    evt.preventDefault();
    const newCardData = { link: linkPlacePopup.value, name: namePlacePopup.value };
    renderCard(newCardData);
    linkPlacePopup.value = '';
    namePlacePopup.value = '';
    closePopup(popupAddCard);
}

const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
};

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
})

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

btnCloseCard.addEventListener('click', () => closePopup(popupAddCard));

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));



// Просмотр изображения

const imgElems = document.querySelectorAll('.gallery__image');
const popupImgMain = document.querySelector('.popup_type_view-img');
const btnCloseImg = document.querySelector('.popup__close-view');
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

btnCloseImg.addEventListener('click', closeImgPopup);
