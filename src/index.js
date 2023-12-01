import './pages/index.css';
import { initialCards } from './components/cards.js';
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const newCardPButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');

const formElementCard = newCardModal.querySelector('.popup__form');
const cardModal = document.querySelector('.popup_type_image');
const imageCardModal = cardModal.querySelector('.popup__image');
const captionCardModal = cardModal.querySelector('.popup__caption');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profilePopup = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function addCards() {
  initialCards.forEach(function (card) {
    cardsList.append(
      createCard(card, handleDeleteCard, handleLikeCard, showCardInModal)
    );
  });
}

profileButton.addEventListener('click', function () {
  openModal(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

newCardPButton.addEventListener('click', function () {
  openModal(newCardModal);
});

function showCardInModal(img) {
  imageCardModal.src = img.target.src;
  imageCardModal.alt = img.target.alt;
  captionCardModal.textContent = img.target.alt;
  openModal(cardModal);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
    alt: newCardNameInput.value,
  };
  cardsList.prepend(
    createCard(newCard, handleDeleteCard, handleLikeCard, showCardInModal)
  );
  closeModal(newCardModal);
  evt.target.reset();
}
formElementCard.addEventListener('submit', handleNewCardSubmit);

addCards();
