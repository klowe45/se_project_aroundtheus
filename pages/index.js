import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileModalClosed = document.querySelector("#profile-modal-closed");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
//const cardListEl = document.querySelector(".cards__list");
//const cardTemplate =
//document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#profile-add-modal");
//const cardModalClosed = document.querySelector("#modal-card-closed");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#modal__input_type_title");
const cardUrlInput = document.querySelector("#modal__input_type_url");
const cardsWrap = document.querySelector(".cards__list");

// modal preview El

const modalPreview = document.querySelector("#modal-preview");
const modalClosePreview = modalPreview.querySelector("#modal-close-preview");
const modalImagePreviewEl = modalPreview.querySelector(".modal__image-preview");
const modalPreviewTitle = modalPreview.querySelector("#modal-image-title");

//Functions

//      open/close
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", handleModalClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", handleModalClick);
}

function handleModalClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleImgClick(card) {
  modalImagePreviewEl.src = card.link;
  modalImagePreviewEl.url = card.name;
  modalPreviewTitle.textContent = card.name;
  openModal(modalPreview);
}

//      renderCard
function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImgClick);
  return card.getView();
}

function renderCard(cardData, cardsWrap) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

//Event Handlers
function handlersProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
  addFormValidator.disableButton();
}

//Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handlersProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//validator

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
