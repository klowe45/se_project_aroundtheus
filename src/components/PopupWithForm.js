import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    const inputList = document.querySelectorAll(".modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
  setEventListeners() {
    super._setEventSelectors();
    this._popupForm.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues);
    });
  }
}
