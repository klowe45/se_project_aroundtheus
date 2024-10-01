export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    return {
      title: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent,
    };
  }
  setUsersInfo({ name, description }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  }
}
