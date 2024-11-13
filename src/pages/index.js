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

/**************************************************************************
 *                               API                                      *
 **************************************************************************/
//token: f4f8a497-25b7-4571-a952-d6bcf9aed847

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f4f8a497-25b7-4571-a952-d6bcf9aed847",
    "Content-Type": "application/json",
  },
});

//console.log(api);

/**************************************************************************
 *                               VALIDATION                               *
 **************************************************************************/

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/**************************************************************************
 *                               Popup with Img                               *
 **************************************************************************/

const imagePopup = new PopupWithImg("#modal-preview");
imagePopup.setEventListeners();

/**************************************************************************
 *                               Confirmation                             *
 **************************************************************************/

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

/**************************************************************************
 *                              Render                                    *
 **************************************************************************/

const cardList = new Section(
  {
    renderer: (item) => {
      const cardELement = createCard(item);
      cardList.addItem(cardELement);
    },
  },
  ".cards__list"
);

//console.log(cardList);

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

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;

  addNewCard.setLoading(true);

  api
    .addCard({ name, link })
    .then((cardData) => {
      const card = createCard(cardData);

      cardList.addItem(card);
      addNewCard.close();
      addCardForm.reset();
    })
    .catch((error) => {
      console.error(error);
    })

    .finally(() => {
      console.log("Post success.");
      addNewCard.setLoading(false);
    });
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageAction,
    handleDeleteCard,
    likeCard,
    unlikeCard
  );
  return card.getView();
}

api
  .getInitialCards()
  .then((res) => {
    console.log(res);
    cardList.renderItems(res);
  })

  .catch((err) => alert(err));

/**************************************************************************
 *                               Like                                      *
 **************************************************************************/

function likeCard(card) {
  api
    .likeCard(card.id, card.isLiked)
    .then((res) => {
      console.log(res);
      card.setIsLiked(res.isLiked);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log("Card Liked");
    });
}
/**************************************************************************
 *                               Unlike                                    *
 **************************************************************************/

function unlikeCard(card) {
  api
    .unlikeCard(card.id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

/**************************************************************************
 *                               addNewCard                               *
 **************************************************************************/
const addNewCard = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);
addNewCard.setEventListeners();

/**************************************************************************
 *                               User Info                                *
 **************************************************************************/

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUsersInfo(res);
    userInfo.updateAvaImg(res);
  })
  .catch((err) => alert(err));

/**************************************************************************
 *                               Edit Profile                             *
 **************************************************************************/

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();

function handleProfileEditSubmit(formValues) {
  editProfileModal.setLoading(true);
  api
    .updateUserInfo({
      title: formValues.name,
      description: formValues.description,
    })
    .then(() => {
      userInfo.setUsersInfo({
        name: formValues.name,
        about: formValues.description,
      });
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error with updating Info.", err);
    })
    .finally(() => {
      console.log("Profile Updated");
      editProfileModal.setLoading(false);
    });
}

/**************************************************************************
 *                               Edit Avatar                              *
 **************************************************************************/
const profileAvaForm = document.querySelector("#modal-ava-form");
const profileAvaFormValidator = new FormValidator(
  validationSettings,
  profileAvaForm
);
profileAvaFormValidator.enableValidation();

const newAvaImgModal = new PopupWithForm("#modal-ava", handleAvaEditSubmit);
newAvaImgModal.setEventListeners();

function handleAvaEditSubmit(data) {
  newAvaImgModal.setLoading(true);
  api
    .setUserAvatar(data.url)
    .then((res) => {
      userInfo.updateAvaImg(res);
      newAvaImgModal.setEventListeners();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Avatar updated");
      newAvaImgModal.setLoading(false);
    });
}

const AvaImgHover = document.querySelector(".profile__edit-img");
AvaImgHover.addEventListener("click", () => {
  newAvaImgModal.open();
});

/**************************************************************************
 *                               Event Listener                           *
 **************************************************************************/

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

/**************************************************************************
 *                              Functions                                 *
 **************************************************************************/
function handleImageAction(data) {
  imagePopup.open(data);
}
