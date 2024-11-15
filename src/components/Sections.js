export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._element = document.querySelector(container);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._element.prepend(element);
  }
  clear() {
    this._element.innerHTML = "";
  }
}
