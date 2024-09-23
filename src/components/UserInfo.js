export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
  }
  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.aboutElement.textContent,
    };
  }
  setUsersInfo({ name, about }) {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
  }
}
