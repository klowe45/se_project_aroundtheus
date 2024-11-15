import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationDelete) {
    super({ popupSelector });
    this._confirmDelete = document.querySelector("#confirmation-delete");
    this._handleConfirmationDelete = handleConfirmationDelete;
    this.setEventListeners();
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  submitHandle(submit) {
    this._handleFormSubmit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDelete.addEventListener("click", () => {
      this._handleFormSubmit();
    });
  }
}
