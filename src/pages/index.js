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

const addCardModal = new PopupWithForm(
  selectors.addCardForm,
  handleAddCardFormSubmit
);

addCardModal._setEventListeners();

//addCard .................................

//edit profile .................................

const profileEditPopup = new PopupWithForm(
  "#profile-add-modal",
  handleProfileEditSubmit
);

//edit profile .................................

//Event Handlers .................................

//Event Listeners .................................

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  profileEditPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.name;
  profileDescriptionInput.value = formValues.about;
  profileEditPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//popup img .................................
const imagePopup = new PopupWithImg("#modal-image-preview");
imagePopup.open(data);
//popup img .................................

profileEditForm.addEventListener("submit", handlersProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardModal.open();
});

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
  addCardModal.close();
}

function createCard(data) {
  const card = new Card(data, "#card=template", handleImageClick);
  return card.getView();
}

//functions ..................................
