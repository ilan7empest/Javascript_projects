class Game {
  #btn = document.querySelector('#startBtn');
  #message = document.querySelector('#message');
  #gameArea = document.querySelector('#gameArea');
  constructor() {
    this._events();
    this.state = {
      playing: false,
      start: 0,
      end: 0,
      timer: null,
    };
  }
  _events() {
    this.#btn.addEventListener('click', this.#startGame.bind(this));
  }
  #startGame() {
    if (!this.state.playing) {
      this.state.playing = true;
      this.#btn.style.display = 'none';
      this._messager('Click the circle as fast as you can');
      this.state.timer = setTimeout(() => {
        this._renderCircle();
      }, 1000);
    }
  }
  _renderCircle() {
    this.state.start = new Date();
    const circle = new Circle().render();
    circle.addEventListener('click', this._hit.bind(this));
    this.#gameArea.appendChild(circle);
  }
  _hit() {
    this.state.end = new Date();
    const total = parseFloat((this.state.end - this.state.start) / 1000);
    this._messager(`You clicked in ${total} seconds`);
    this.#gameArea.textContent = '';
    this.#btn.style.display = 'block';
    this.state.playing = false;
    clearTimeout(this.state.timer);
  }

  _messager(msg) {
    this.#message.textContent = msg;
  }
}

class Circle {
  render() {
    const div = document.createElement('div');
    div.setAttribute('class', 'circle');
    div.style.backgroundColor = this._randomColor();
    div.style.top = this._randomNum(400) + 'px';
    div.style.left = this._randomNum(400) + 'px';
    return div;
  }
  _randomNum(num) {
    return Math.floor(Math.random() * num);
  }
  _randomColor() {
    let count = 3;
    let hex = '#';
    while (count > 0) {
      const randomNum = this._randomNum(256).toString(16).padStart(2, 0);
      hex += randomNum;
      count--;
    }
    return hex;
  }
}

new Game();
