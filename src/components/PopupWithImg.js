import Popup from "./Popup.js";

export default class PopupWithImg extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewTitle = this._popupElement.querySelector("#modal-image-title");
  }
  open({ link, name }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewTitle.textContent = name;
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
