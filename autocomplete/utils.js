export const bounce = (func) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => func.apply(null, args), 1000);
  };
};
