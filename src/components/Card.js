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
    this.link = data.link;
    this._cardSelector = cardSelector;
    this.handleImageAction = handleImageAction;
    this.handleDeleteCard = handleDeleteCard;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this.likeCard = likeCard;
    this._unliked = unliked;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this.likeCard(this);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageAction({ name: this._name, link: this.link });
      });
  }

  getId() {
    return this.id;
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle(".card__like-button_active");
  }

  removeCard() {
    this._cardElement.remove();
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.setButtonState();
  }

  setButtonState() {
    if (this.isLiked) {
      this._likeButton.classList.toggle("card__like-button_active");
    } else this._likeButton.classList.remove("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this.link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    this.setButtonState();
    return this._cardElement;
  }
}
