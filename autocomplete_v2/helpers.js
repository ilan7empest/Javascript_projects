/**
 * Debounce function for delaying request
 * @function debounce
 * @param {function} function to debounce
 * @returns {Proxy}
 * @param {args}
 */
// export const debounce = (func) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply({}, args), 800);
//   };
// };

export const debounce = (func) => {
  let timeout;
  return new Proxy(func, {
    apply(target, thisArg, args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => target.apply(thisArg, args), 1000);
    },
  });
};
