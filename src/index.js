import './pages/index.css';
import { initialCards } from './components/cards.js';
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

export const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const newCardButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');

const formElementCard = newCardModal.querySelector('.popup__form');
const cardModal = document.querySelector('.popup_type_image');
const imageCardModal = cardModal.querySelector('.popup__image');
const captionCardModal = cardModal.querySelector('.popup__caption');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileModal = document.querySelector('.popup_type_edit');
const formElementProfile = profileModal.querySelector('.popup__form');
const profileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const closeProfileModalButton = profileModal.querySelector('.popup__close');
const closeNewCardModalButton = newCardModal.querySelector('.popup__close');
const closeCardModalButton = cardModal.querySelector('.popup__close');
const popupList = [profileModal, newCardModal, cardModal];

function addCards() {
  initialCards.forEach(function (card) {
    cardsContainer.append(
      createCard(card, handleDeleteCard, handleLikeCard, showCardInModal)
    );
  });
}

function showCardInModal(card) {
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  captionCardModal.textContent = card.name;
  openModal(cardModal);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };
  cardsContainer.prepend(
    createCard(newCard, handleDeleteCard, handleLikeCard, showCardInModal)
  );
  closeModal(newCardModal);
  evt.target.reset();
}

function openProfileModal() {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupList.forEach((popup) => {
  popup.addEventListener('click', handleCloseModalOverlay);
});

newCardButton.addEventListener('click', function () {
  openModal(newCardModal);
});
profileButton.addEventListener('click', openProfileModal);
formElementProfile.addEventListener('submit', handleProfileSubmit);
formElementCard.addEventListener('submit', handleNewCardSubmit);
closeProfileModalButton.addEventListener('click', () =>
  closeModal(profileModal)
);
closeNewCardModalButton.addEventListener('click', () =>
  closeModal(newCardModal)
);
closeCardModalButton.addEventListener('click', () => closeModal(cardModal));

addCards();
