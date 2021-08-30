import View from './View.js';

class Cart extends View {
  _parentEl = document.querySelector('#Cart');
  _generateMarkup() {
    return `
            <div><h5>Shopping Cart ${
              this._data.length == 0 ? 'is Empty' : ''
            }</h5>
            <p>${this._data.map((item) => {
              const { id, productName, cost, amount } = item;
              return `<div>
                <span>Name: ${productName}</span>
                <span>Amount: ${amount}</span>
                <span>Total: ${(+cost * +amount).toFixed(2)}</span>
                </div>`;
            })}</p></div>
        `;
  }
}

export default new Cart();
