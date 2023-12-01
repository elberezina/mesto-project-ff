
function openModal(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleCloseModalEsc);
    document.addEventListener('click', handleCloseModalOverlay); 
    document.addEventListener('click', handleCloseModalButton); 
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalEsc);
    document.removeEventListener('click', handleCloseModalOverlay);
    document.removeEventListener('click', handleCloseModalButton); 
}

function handleCloseModalButton()  {
    const modalOpened = document.querySelector('.popup_is-opened');
    const closeModalButton = modalOpened.querySelector('.popup__close');
    closeModalButton.addEventListener("click", () => 
    closeModal(modalOpened))
}

function handleCloseModalOverlay(evt)  {
    if (evt.target.classList.contains('popup_is-opened')) {
    const modalOpened = document.querySelector('.popup_is-opened');
    closeModal(modalOpened);
    }
}

function handleCloseModalEsc(evt) {
    if (evt.key==='Escape') {
      const modalOpened = document.querySelector('.popup_is-opened');
      closeModal(modalOpened);
    }
}

export { openModal, closeModal };