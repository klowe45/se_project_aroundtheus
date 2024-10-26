export default class UserInfo {
  constructor(nameElement, descriptionElement, avaImg) {
    this._nameElement = document.querySelector(nameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
    this._avaImg = document.querySelector(avaImg);
  }
  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }
  setUsersInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
  updateAvaImg(img) {
    if (img.ava) {
      this._avaImg.src = img.ava;
    }
  }
}
