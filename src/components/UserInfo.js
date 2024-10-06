export default class UserInfo {
  constructor(nameElement, descriptionElement) {
    this._nameElement = document.querySelector(nameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
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
}
