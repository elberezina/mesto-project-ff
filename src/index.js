import './pages/index.css';
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from './components/card.js';
import {
  openModal,
  closeModal,
  handleCloseModalOverlay,
} from './components/modal.js';

import * as api from './components/api.js';
import { clearValidation, enableValidation } from './components/validation.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const newCardButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardModal.querySelector('.popup__input_type_url');

const formElementCard = newCardModal.querySelector('.popup__form');
const cardModal = document.querySelector('.popup_type_image');
const imageCardModal = cardModal.querySelector('.popup__image');
const captionCardModal = cardModal.querySelector('.popup__caption');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const avatarModal = document.querySelector('.popup_type_avatar');
const formElementAvatar = avatarModal.querySelector('.popup__form');
const avatarUrlInput = avatarModal.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

const profileModal = document.querySelector('.popup_type_edit');
const formElementProfile = profileModal.querySelector('.popup__form');
const profileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const closeAvatarModalButton = avatarModal.querySelector('.popup__close');
const closeProfileModalButton = profileModal.querySelector('.popup__close');
const closeNewCardModalButton = newCardModal.querySelector('.popup__close');
const avatarButtonSave = avatarModal.querySelector('.popup__button');
const profileButtonSave = profileModal.querySelector('.popup__button');
const newCardButtonSave = newCardModal.querySelector('.popup__button');

const closeCardModalButton = cardModal.querySelector('.popup__close');
const popupList = [profileModal, newCardModal, cardModal, avatarModal];
let profileId = null;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

Promise.all([api.getProfileDetails(), api.getCards()])
  .then(([ProfileDetails, Cards]) => {
    profileId = ProfileDetails._id;
    profileImage.style.backgroundImage = `url(\\${ProfileDetails.avatar})`;
    profileName.textContent = ProfileDetails.name;
    profileJob.textContent = ProfileDetails.about;

    Cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card,
          handleDeleteCard,
          handleLikeCard,
          showCardInModal,
          profileId
        )
      );
    });
  })
  .catch((error) =>
    console.error('Ошибка получения данных по картам и профилю', error)
  );

function openProfileModal() {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function showCardInModal(card) {
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  captionCardModal.textContent = card.name;
  openModal(cardModal);
}

function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(avatarButtonSave, true);
  api
    .updateAvatar(avatarUrlInput.value)
    .then((result) => {
      profileImage.style.backgroundImage = `url(\\${result.avatar})`;
      closeModal(avatarModal);
    })
    .catch((err) => console.error(`Ошибка обновления аватара ${err}`))
    .finally(() => {
      renderLoading(avatarButtonSave, false);
    });

  evt.target.reset();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(profileButtonSave, true);
  api
    .updateProfile(nameInput.value, jobInput.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      closeModal(profileModal);
    })
    .catch((err) => console.error(`Ошибка обновления профиля ${err}`))
    .finally(() => {
      renderLoading(profileButtonSave, false);
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(newCardButtonSave, true);
  api
    .addCard(newCardNameInput.value, newCardLinkInput.value)
    .then((card) => {
      cardsContainer.prepend(
        createCard(
          card,
          handleDeleteCard,
          handleLikeCard,
          showCardInModal,
          profileId
        )
      );
      closeModal(newCardModal);
    })
    .catch((err) => console.error(`Ошибка добавления карты ${err}`))
    .finally(() => {
      renderLoading(newCardButtonSave, false);
    });

  evt.target.reset();
}

function renderLoading(submitButton, isLoading) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

popupList.forEach((popup) => {
  popup.addEventListener('click', handleCloseModalOverlay);
});

profileImage.addEventListener('click', function () {
  clearValidation(avatarModal, validationConfig);
  openModal(avatarModal);
});

newCardButton.addEventListener('click', function () {
  clearValidation(newCardModal, validationConfig);
  openModal(newCardModal);
});

profileButton.addEventListener('click', function () {
  clearValidation(profileModal, validationConfig);
  openProfileModal();
});

formElementAvatar.addEventListener('submit', handleUpdateAvatarSubmit);
formElementProfile.addEventListener('submit', handleProfileSubmit);
formElementCard.addEventListener('submit', handleNewCardSubmit);

closeAvatarModalButton.addEventListener('click', () => {
  closeModal(avatarModal);
});

closeProfileModalButton.addEventListener('click', () => {
  closeModal(profileModal);
});

closeNewCardModalButton.addEventListener('click', () => {
  closeModal(newCardModal);
});

closeCardModalButton.addEventListener('click', () => closeModal(cardModal));

enableValidation(validationConfig);
