class Square {
  #box;
  render() {
    this.#box = document.createElement('div');
    this.#box.classList.add('box');
    this.#box.style.width = '100px';
    this.#box.style.height = '100px';
    this.#box.tempColor = this.generateColor();
    this.#box.style.backgroundColor = this.#box.tempColor;
    return this.#box;
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }
}

class Game {
  #gameArea = document.querySelector('#gameArea');
  #score = document.querySelector('#score');
  #posXEl = document.querySelector('#posX');
  #posYEl = document.querySelector('#posY');
  #box;
  constructor() {
    this.state = {
      isPlaying: false,
      score: 0,
      speed: 5,
    };
    this.gameAreaRect = this.#gameArea.getBoundingClientRect();
    this.#createBox();
    this._events();
  }
  _events() {
    this.#gameArea.addEventListener('mouseenter', this.#start.bind(this));
    this.#gameArea.addEventListener('mouseleave', this.#stop.bind(this));
    this.#gameArea.addEventListener(
      'mousemove',
      this.#getXYPosiotions.bind(this)
    );
  }
  #createBox() {
    const square = new Square();
    this.#box = square.render();
    this.#box.steps = Math.trunc(Math.random() * 20);
    this.#box.direction = Math.floor(Math.random() * 4);
    this.#gameArea.appendChild(this.#box);

    this.#box.posX = this.#box.offsetLeft;
    this.#box.posY = this.#box.offsetTop;

    this.#box.addEventListener('mouseover', () => {
      this.#box.style.backgroundColor = 'red';
    });
    this.#box.addEventListener('mouseout', () => {
      this.#box.style.backgroundColor = this.#box.tempColor;
    });
    this.#box.addEventListener('click', () => {
      this.#box.tempColor = square.generateColor();
      this.state.score++;
      this.#score.textContent = this.state.score;
    });
  }
  #animateBox() {
    this.state.speed = Math.random() * 10 + 15;
    if (this.state.isPlaying) {
      this.#box.steps--;
      if (this.#box.steps < 0) {
        this.#box.steps = Math.trunc(Math.random() * 20);
        this.#box.direction = Math.floor(Math.random() * 4);
      }
      if (
        this.#box.direction == 0 &&
        this.#box.posX <
          this.gameAreaRect.width - parseInt(this.#box.style.width)
      ) {
        this.#box.posX += this.state.speed;
      }
      if (this.#box.direction == 1 && this.#box.posX > this.gameAreaRect.left) {
        this.#box.posX -= this.state.speed;
      }
      if (
        this.#box.direction == 2 &&
        this.#box.posY <
          this.gameAreaRect.height - parseInt(this.#box.style.height)
      ) {
        this.#box.posY += this.state.speed;
      }
      if (this.#box.direction == 3 && this.#box.posY > 0) {
        this.#box.posY -= this.state.speed;
      }
      this.#box.style.left = this.#box.posX + 'px';
      this.#box.style.top = this.#box.posY + 'px';

      window.requestAnimationFrame(this.#animateBox.bind(this));
    }
  }
  #start(e) {
    this.state.isPlaying = true;
    this.#gameArea.style.backgroundColor = '#00a5ce';
    window.requestAnimationFrame(this.#animateBox.bind(this));
  }
  #stop(e) {
    this.#gameArea.style.backgroundColor = '';
    this.state.isPlaying = false;
  }
  #getXYPosiotions(e) {
    this.#posXEl.textContent = e.clientX - this.#gameArea.offsetLeft;
    this.#posYEl.textContent = e.clientY - this.#gameArea.offsetTop;
  }
}

new Game();
