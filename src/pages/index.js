import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImg from "../components/PopupWithImg.js";
import Section from "../components/sections.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
import { initialCards, selectors } from "../utils/constants.js";
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
} from "../utils/constants.js";

//API token
//token: 5e8d0160-08cb-4cfd-af3f-1e422233210e

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e8d0160-08cb-4cfd-af3f-1e422233210e",
    "Content-Type": "application/json",
  },
});

//console.log(api);

//validator .................................

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//validator .................................

//Popup with image..............................

const imagePopup = new PopupWithImg("#modal-preview");
imagePopup.setEventListeners();

//Popup with image..............................

//confirmation..................................

const deleteCardConfirmation = new PopupConfirmation(
  "#confirmation-delete-modal",
  async (cardId, cardElement) => {
    try {
      await api.removeCard(cardId);
      cardElement.removeCard();
    } catch (err) {
      console.error(`Error upon Card Delete ${err}`);
    }
  }
);

//confirmation..................................

//Sections/Card .................................

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageAction,
    handleDeleteCard,
    handleLikeAction
  );
  return card.getView();
}

function handleDeleteCard(card) {
  deleteCardConfirmation.submitHandle(() => {
    api
      .removeCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteCardConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  deleteCardConfirmation.open();
}

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

api.getInitialCards().then((res) => {
  cardList.renderItems(res);
});

//user info .................................

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

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

//edit ava
const profileAvaForm = document.querySelector("#modal-ava-form");
const profileAvaFormValidator = new FormValidator(
  validationSettings,
  profileAvaForm
);
profileAvaFormValidator.enableValidation();

const newAvaImgModal = new PopupWithForm("#modal-ava", handleAvaEditSubmit);
newAvaImgModal.setEventListeners();

function handleAvaEditSubmit(data) {
  //make a loading function

  api
    .updateAvatar(data.url)
    .then((res) => {
      userInfo.updateAvaImg(res);
      newAvaImgModal.setEventListeners();
      profileAvaForm.setEventListeners();
      //makeloading
    })
    .catch((err) => {
      console.log(err);
    });
}

const AvaImgHover = document.querySelector(".profile__edit-img");
AvaImgHover.addEventListener("click", () => {
  newAvaImgModal.open();
});
//edit ava

//Event Listeners .................................

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addNewCard.open();
});

profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.title;
  profileDescriptionInput.value = formValues.description;
  editProfileModal.open();
});

//functions .................................

function handleImageAction(Data) {
  imagePopup.open(Data);
}

function handleProfileEditSubmit(formValues) {
  userInfo.setUsersInfo({
    name: formValues.name,
    description: formValues.description,
  });
  editProfileModal.close();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;

  const card = createCard({ name, link });
  cardList.addItem(card);
  addNewCard.close();
}

function handleLikeAction(card) {
  if (card.setIsLiked) {
    api
      .unlikeCard(card._Id)
      .then(() => {
        card.setIsLiked();
      })
      .catch(console.error);
  } else {
    api
      .likeCard(card._Id)
      .then(() => {
        card.setIsLiked();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

//functions ..................................
