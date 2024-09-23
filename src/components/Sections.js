export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._Element = document.querySelector(container);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._element.prepend(element);
  }
  clear() {
    this._element.innerHTML = "";
  }
  addItem(element) {
    this._element.prepend(element);
  }
}
