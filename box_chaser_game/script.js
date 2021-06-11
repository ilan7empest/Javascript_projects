class Game {
  #gameArea = document.querySelector('.gameArea');
  #gameAreaRect = this.#gameArea.getBoundingClientRect();
  #score = document.querySelector('.score');
  #box;
  constructor() {
    this.squares = [];
    this.#box = {};
    this.gameBoard = {
      x: Math.floor(this.#gameAreaRect.width / 100),
      y: Math.floor(this.#gameAreaRect.height / 100),
    };
    this.player = {
      move: 100,
      currentSquare: 1,
      score: 0,
    };
    this.squareTarget = null;
    this._events();
  }
  _events() {
    document.addEventListener('DOMContentLoaded', this.#createBoard.bind(this));

    document.addEventListener('keyup', this.handleKeys.bind(this));
  }
  #createBoard() {
    this.#createGrid();
    this.#createBox();
    this.#createTarget();
  }

  #createBox() {
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.textContent = this.player.currentSquare;
    this.#box = {
      box,
      x: this.#gameAreaRect.left,
      y: this.#gameAreaRect.top,
    };
    box.style.left = this.#box.x + 'px';
    box.style.top = this.#box.y + 'px';

    this.#gameArea.appendChild(box);
  }
  #createGrid() {
    const squaresTotal = this.gameBoard.x * this.gameBoard.y;
    for (let i = 0; i < squaresTotal; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.textContent = i + 1;
      this.squares[i] = square;
      this.#gameArea.appendChild(square);
    }
  }
  handleKeys(e) {
    const allowKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
    if (allowKeys[e.keyCode]) {
      this.#handlePress(allowKeys[e.keyCode]);
    }
  }
  #handlePress(keyCode) {
    switch (keyCode) {
      case 'up':
        if (this.#box.y > 0) {
          this.#box.y -= this.player.move;
          this.player.currentSquare -= this.gameBoard.x;
        }
        break;
      case 'down':
        if (this.#box.y < this.#gameAreaRect.bottom - this.player.move) {
          this.#box.y += this.player.move;
          this.player.currentSquare += this.gameBoard.x;
        }
        break;
      case 'left':
        if (this.#box.x > 0) {
          this.#box.x -= this.player.move;
          this.player.currentSquare--;
        }
        break;
      case 'right':
        if (this.#box.x < this.#gameAreaRect.width - this.player.move) {
          this.#box.x += this.player.move;
          this.player.currentSquare++;
        }
        break;
    }
    this.#box.box.style.left = this.#box.x + 'px';
    this.#box.box.style.top = this.#box.y + 'px';
    this.#box.box.textContent = this.player.currentSquare;

    this.#handleCollision();
  }

  #createTarget() {
    const rndIdx = Math.floor(Math.random() * this.squares.length) + 1;
    if (rndIdx !== this.player.currentSquare) {
      this.squareTarget = this.squares[rndIdx];
      this.squareTarget.classList.add('active');
    } else {
      this.#createTarget();
    }
  }
  #handleCollision() {
    if (
      this.squares[this.player.currentSquare - 1].classList.contains('active')
    ) {
      this.squareTarget.classList.remove('active');
      this.#createTarget();
      this.player.score++;
      this.#score.textContent = this.player.score;
    }
  }
}

const game = new Game();

console.log(game);
