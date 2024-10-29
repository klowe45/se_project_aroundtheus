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
//token: 2404f969-b0fb-4f79-889b-605b6350b491

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2404f969-b0fb-4f79-889b-605b6350b491",
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

/*function renderItems(items) {
  items.forEach((items) => {
    this._renderer(items);
  });
}*/

/*api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section({
      items: ititialCards,
      renderer: (item) => {
        const card = createCard(item);
        cardSection.addItem(card);
      },
    });
    cardSection.renderItems();
  })
  .catch(console.error);

const res = api.createCard({ name, link });
cardList.addItem(createCard(res));

addNewCardButton.addEventListener("click", () => {
  //addCardModal.open();
});*/

//confirmation..................................

const deleteCardConfirmation = new PopupConfirmation(
  "#modal__confirmation",
  async (cardId, cardELement) => {
    try {
      await api.removeCard(cardId);
      cardELement.removeCard();
    } catch (err) {
      console.error(`Error upon Card Delete ${err}`);
    }
  }
);

//confirmation..................................

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

//Popup with image..............................

const imagePopup = new PopupWithImg("#modal-preview");
imagePopup.setEventListeners();

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
        console.err(err);
      });
  }
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

//functions ..................................
