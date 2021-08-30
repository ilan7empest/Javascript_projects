class Button {
  constructor() {
    return this.render();
  }
  render() {
    const btn = document.createElement('button');
    btn.innerText = 'CLICK ME';
    btn.style.padding = '10px';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.backgroundColor = 'red';
    btn.style.position = 'absolute';
    btn.style.left = 'calc(50% - 2%)';
    btn.style.top = 'calc(50% - 2%)';
    return btn;
  }
}
class Game {
  #root = document.querySelector('body');
  #btnDimentions;
  #button;
  constructor() {
    this.init = this.init.bind(this);
  }
  init() {
    this.#button = new Button();
    this.#root.append(this.#button);
    this._events();
    this.#btnDimentions = this.#button.getBoundingClientRect();
  }
  _events() {
    this.#button.addEventListener('mouseover', this.handleOver.bind(this));
  }
  handleOver() {
    const left = this.#calcLeft();
    const top = this.#calcTop();
    this.#button.style.left = left + 'px';
    this.#button.style.top = top + 'px';
  }
  #calcLeft() {
    let leftPosition = Math.floor(
      Math.random() * (window.innerWidth - this.#btnDimentions.width)
    );
    return leftPosition;
  }
  #calcTop() {
    let topPosition = Math.floor(
      Math.random() * (window.innerHeight - this.#btnDimentions.height)
    );
    return topPosition;
  }
}

const game = new Game();
game.init();

console.log(x.a);
var x = {
  a: 'sasas',
};
