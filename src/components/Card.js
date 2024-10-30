export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageAction,
    handleDeleteCard,
    handleLikeAction
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._setIsliked = cardData.setIsLiked;
    this._cardSelector = cardSelector;
    this.handleImageAction = handleImageAction;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeAction = handleLikeAction;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeAction();
      });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeAction(this);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageAction({ name: this._name, link: this._link });
      });
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._cardElement.removeCard();
    this._cardElement = null;
  }

  _setIsLiked() {
    if (this.setIsLiked) {
      this._cardElement
        .querySelector("..card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
