import Products from './view/Products.js';
import Cart from './view/Cart.js';
import Model from './model.js';

(function () {
  function renderProducts() {
    const Items = Model.fetchProducts();
    Cart.render(Model.fetchCart());
    Products.render(Items);
  }
  function addItem(id) {
    Model.addItem(id);
    const cart = Model.fetchCart();
    Cart.render(cart);
  }
  function init() {
    renderProducts();
    Products.handleEvent(addItem);
  }
  init();
})();
