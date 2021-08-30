export const Items = [
  {
    id: rndIndex(),
    productName: 'milk',
    cost: 1.75,
  },
  {
    id: rndIndex(),
    productName: 'apple',
    cost: 2.43,
  },
  {
    id: rndIndex(),
    productName: 'bread',
    cost: 0.95,
  },
  {
    id: rndIndex(),
    productName: 'butter',
    cost: 0.5,
  },
];

function rndIndex() {
  return Math.floor(Math.random() * 9e9).toString();
}
