export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
  }
  handleEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _setEventSelectors() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
