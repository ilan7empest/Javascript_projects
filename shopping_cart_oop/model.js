import { Items } from './items.js';

const Model = (function () {
  const state = {
    products: Items,
    sc: [],
  };

  const addItem = (id) => {
    const existingItem = state.sc.find((product) => product.id === id);

    if (!existingItem) {
      const newItem = state.products.find((product) => product.id === id);
      state.sc.push({ ...newItem, amount: 1 });
      return;
    }
    const productIndex = state.sc.findIndex((product) => product.id === id);
    const updatedSC = [...state.sc];
    updatedSC[productIndex] = {
      ...updatedSC[productIndex],
      amount: state.sc[productIndex].amount + 1,
    };
    state.sc = updatedSC;
  };

  function fetchCart() {
    return state.sc;
  }

  const fetchProducts = () => {
    return state.products;
  };

  return {
    addItem,
    fetchProducts,
    fetchCart,
  };
})();

export default Model;
