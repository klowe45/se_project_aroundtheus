import FormValidator from "../components/formValidator.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImg from "../components/PopupWithImg.js";
import Section from "../components/sections.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../../utils/constants.js";
import { initialCards, selectors } from "../../utils/constants.js";
import "./index.css";
import {
  modalPreviewTitle,
  profileModalClosed,
  profileTitle,
  profileDescription,
  cardListEl,
  cardTemplate,
  addNewCardButton,
  cardModalClosed,
  addCardForm,
  cardTitleInput,
  cardUrlInput,
  cardsWrap,
  profileEditModal,
  profileEditForm,
  addCardButton,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  addCardModal,
  addProfileModal,
} from "../../utils/constants.js";

//validator .................................

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//validator .................................

//Sections .................................

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardELement = createCard(item);
      cardList.addItem(cardELement);
    },
  },
  ".cards__list"
);

cardList.renderItems();

//user info .................................

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__desription",
});

//userinfo .................................

//addCard .................................

const addNewCard = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);
addNewCard.setEventListeners();

//addCard .................................

//edit profile .................................

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();

//edit profile .................................

//Popup with image..............................

const imagePopup = new PopupWithImg(".modal__image-container");
imagePopup.setEventListeners();

//Popup with image..............................

//Event Handlers .................................

//Event Listeners .................................

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addNewCard.open();
});

profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.name;
  profileDescriptionInput.value = formValues.about;
  editProfileModal.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

profileEditForm.addEventListener("submit", handlersProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//functions .................................

function handleImageClick(data) {
  imagePopup.open(data);
}

function handleProfileEditSubmit(formValues) {
  userInfo.setUsersInfo({
    name: formValues.title,
    about: formValues.card__description,
  });
  profileEditPopup.close();
}

function handleAddCardFormSubmit(formValues) {
  e.preventDefault();
  const name = formValues.title;
  const link = formValues.url;

  const card = createCard({ name, link });
  cardList.addItem(card);
  addCardFormElement.resest();
  addNewCard.close();
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

//functions ..................................
