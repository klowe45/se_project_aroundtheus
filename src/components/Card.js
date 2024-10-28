export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData.id;
    this.setIsliked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  getID() {
    return this._id;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setIsLiked() {
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

  handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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
