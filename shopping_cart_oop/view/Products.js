import View from './View.js';

class Products extends View {
  _parentEl = document.querySelector('#Products');
  #products = [];
  _generateMarkup() {
    const wrapper = document.createDocumentFragment();
    this._data.map(({ id, productName, cost }) => {
      const div = document.createElement('div');
      const title = document.createElement('span');
      const itemCost = document.createElement('span');
      title.textContent = productName;
      itemCost.textContent = '$' + cost;
      div.appendChild(title);
      div.appendChild(itemCost);
      div.id = id;
      div.setAttribute(
        'style',
        'width: 200px;display: flex;justify-content: space-between'
      );
      this.#products.push(div);
      wrapper.appendChild(div);
    });
    return wrapper;
  }
  handleEvent(handler) {
    this.#products.forEach((item) => {
      item.addEventListener('click', (e) => {
        const { id } = e.target.closest('div');
        return handler(id);
      });
    });
  }
  #markup(item) {
    const { id, productName, cost } = item;
    return `<div id=${id} style="width: 200px;display: flex;justify-content: space-between"><span>${productName}</span><span>${cost}</span></div>`;
  }
}

export default new Products();
