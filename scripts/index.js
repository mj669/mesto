// Pop-up Редактирования профиля

const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = document.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.profile__title');
const jobeInput = document.querySelector('.profile__subtitle');
const namePopup = document.querySelector('.popup__text_type_name');
const jobePopup = document.querySelector('.popup__text_type_about');

function openPopup() {
    popupElem.classList.add('popup_opened');
    writingProfileData();
}

function closePopup() {
    popupElem.classList.remove('popup_opened');
}

function writingProfileData() {
    namePopup.value = nameInput.textContent;
    jobePopup.value = jobeInput.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent = namePopup.value;
    jobeInput.textContent = jobePopup.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

editElem.addEventListener('click', openPopup);

popupCloseElem.addEventListener('click', closePopup);



// Работа с Card

const initialCards = [
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

const addElem = document.querySelector('.profile__add-button');
const popupAddElem = document.querySelector('.popup_type_add-card');
const popupCloseAddElem = document.querySelector('.popup__close-add');
const galleryContainer = document.querySelector('.gallery');
const formAddElement = document.querySelector('.form_type_add');
const namePlacePopup = document.querySelector('.popup__text_type_title');
const linkPlacePopup = document.querySelector('.popup__text_type_link');
const deleteButton = document.querySelector('.gallery__delete');
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

    setEventOnImg(image);

    const deleteButtonActive = newCard.querySelector('.gallery__delete_active');
    deleteButtonActive.addEventListener('click', deleteCardHandler);

    const likeButtonActive = newCard.querySelector('.gallery__like_active');
    likeButtonActive.addEventListener('click', likeCardHandler);

    return newCard;
};

function openAddPopup() {
    popupAddElem.classList.add('popup_opened');
}

function closeAddPopup() {
    popupAddElem.classList.remove('popup_opened');
}

function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const newCardData = { link: linkPlacePopup.value, name: namePlacePopup.value };
    initialCards.unshift(newCardData);
    renderCard(newCardData);
    linkPlacePopup.value = '';
    namePlacePopup.value = '';
    closeAddPopup();
}

const renderCard = (dataCard) => {
    galleryContainer.prepend(generateCard(dataCard));
};

initialCards.forEach((dataCard) => {
    renderCard(dataCard);
})

formAddElement.addEventListener('submit', formAddSubmitHandler);

popupCloseAddElem.addEventListener('click', closeAddPopup);

addElem.addEventListener('click', openAddPopup);



// Просмотр изображения

const imgElems = document.querySelectorAll('.gallery__image');
const popupImgMain = document.querySelector('.popup_type_view-img');
const popupImgClose = document.querySelector('.popup__close-view');
const popupImgElem = popupImgMain.querySelector('.popup__img');
const popupTitle = popupImgMain.querySelector('.popup__figcaption');

function setEventOnImg(item) {
    item.addEventListener('click', (evt) => {
        const imgSrc = evt.target.src;
        const imgItem = initialCards.find(item => item.link === imgSrc);
        openImgPopup(imgItem);
    });
}

function closeImgPopup() {
    popupImgElem.src = '';
    popupTitle.textContent = '';
    popupImgMain.classList.remove('popup_opened');
}

function openImgPopup(imgItem) {
    popupImgElem.src = imgItem.link;
    popupTitle.textContent = imgItem.name;
    popupImgMain.classList.add('popup_opened');
}

popupImgClose.addEventListener('click', closeImgPopup);