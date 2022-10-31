const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = popupElem.querySelector('.popup__close');
let formElement = document.querySelector('.form');

formElement.addEventListener('submit', formSubmitHandler);

editElem.addEventListener('click', function () {
    popupElem.classList.add('popup__opened');
    writingProfileData ();
});

popupCloseElem.addEventListener('click', function () {
    popupElem.classList.remove('popup__opened');
});

function writingProfileData () {
    let nameInput = document.querySelector('.profile__title');
    let jobeInput = document.querySelector('.profile__subtitle');
    let namePopup = document.querySelector('.popup__text_type_name');
    let jobePopup = document.querySelector('.popup__text_type_about');

    namePopup.value = nameInput.innerHTML;
    jobePopup.value = jobeInput.innerHTML;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let nameInput = document.querySelector('.profile__title');
    let jobeInput = document.querySelector('.profile__subtitle');
    let namePopup = document.querySelector('.popup__text_type_name');
    let jobePopup = document.querySelector('.popup__text_type_about');

    nameInput.textContent = `${namePopup.value}`;
    jobeInput.textContent = `${jobePopup.value}`;
    popupElem.classList.remove('popup__opened');
}
