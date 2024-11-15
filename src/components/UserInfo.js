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
      ava: this._avaImg.textContent,
    };
  }
  setUsersInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }
  updateAvaImg(img) {
    if (img.avatar) {
      this._avaImg.src = img.avatar;
    }
  }
}
