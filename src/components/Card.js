export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageAction,
    handleDeleteCard,
    likeCard,
    unliked
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleImageAction = handleImageAction;
    this.handleDeleteCard = handleDeleteCard;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._likeCard = likeCard;
    this._unliked = unliked;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._likeCard(this);
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

  handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  removeCard() {
    this._cardElement.removeCard();
    this._cardElement = null;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.setButtonState();
  }

  setButtonState() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
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
