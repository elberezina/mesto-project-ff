// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  const cardTitle = cardItem.querySelector('.card__title');
  cardTitle.textContent = card.name;

  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  const cardLikeButton = cardItem.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  return cardItem;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const cardDelete = evt.target.closest('.card');
  cardDelete.remove();
}

// @todo: Вывести карточки на страницу

function addCards() {
  initialCards.forEach(function (card) {
    cardsList.append(createCard(card, deleteCard));
  });
}

addCards();
