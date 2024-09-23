import Popup from "./Popup.js";

export default class PopupWithImg extends Popup {
  constructor(PopupSelector) {
    super({ PopupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewTitle = this._popupElement.querySelector("#modal-image-title");
  }
  open(data) {
    super.open();
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._previewTitle.textContent = data.name;
  }
}
