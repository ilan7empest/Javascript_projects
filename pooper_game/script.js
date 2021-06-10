const IconsAPIJSON = {
  'data': [
    { 'icon': '😍', 'value': 10 },
    { 'icon': '🍧', 'value': 30 },
    { 'icon': '🍺', 'value': 50 },
    { 'icon': '🍒', 'value': 150 },
    { 'icon': '🍀', 'value': 60 },
    { 'icon': '🎁', 'value': 40 },
    { 'icon': '🏆', 'value': 75 },
    { 'icon': '🥩', 'value': 100 },
    { 'icon': '💥', 'value': -100 },
    { 'icon': '👹', 'value': -40 },
    { 'icon': '💥', 'value': -250 },
  ],
};
const AJAX = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(IconsAPIJSON), 500);
  });
};

class Game {
  #statsEl = document.querySelector('.stats');
  #mainEl = document.querySelector('.main');
  #gameEl = document.querySelector('.game');
  #startBtn = document.querySelector('.newGame');
  #scorer;

  constructor() {
    this._events();
    this._getData();
    this._hitPop = this._hitPop.bind(this);
    this.state = {
      score: 0,
      lives: 1,
      cards: null,
      playing: false,
    };
  }

  #startGame(e) {
    e.preventDefault();
    this.state.playing = true;
    this.#mainEl.classList.add('hide');
    this.#gameEl.classList.remove('hide');
    this._buildScoreboard();
    this._startPop();
  }

  //Events
  _events() {
    this.#startBtn.addEventListener('click', this.#startGame.bind(this));
  }

  _getData() {
    AJAX()
      .then((res) => {
        this.state.cards = res.data;
        this._buildBoard(4, 4);
      })
      .catch((err) => console.log(err));
  }

  _buildBoard(rows, cells) {
    const gameboard = document.createElement('div');
    let count = 0;
    gameboard.setAttribute('class', 'gameboard');
    for (let rowNum = 0; rowNum < rows; rowNum++) {
      const row = document.createElement('div');
      row.setAttribute('class', 'row');
      for (let cell = 0; cell < cells; cell++) {
        const square = document.createElement('div');
        square.classList.add('square');
        count++;
        square.textContent = count;
        square.count = count;
        row.append(square);
      }
      gameboard.append(row);
    }
    this.#gameEl.appendChild(gameboard);
  }

  _buildScoreboard() {
    const wrapper = document.createElement('div');
    this.#scorer = document.createElement('span');
    this.#scorer.textContent = `Score: ${this.state.score}, Lives: ${this.state.lives}`;

    wrapper.appendChild(this.#scorer);
    this.#statsEl.appendChild(wrapper);
  }

  _updateScoreBoard() {
    this.#scorer.textContent = `Score: ${this.state.score}, Lives: ${this.state.lives}`;
  }

  _startPop() {
    const currSquare = this._random();
    currSquare.classList.add('active');
    const time = Math.round(Math.random() * 1500 + 750);
    const card =
      this.state.cards[Math.floor(Math.random() * this.state.cards.length)];
    currSquare.old = currSquare.innerHTML;
    currSquare.value = card.value;
    currSquare.addEventListener('click', this._hitPop);
    currSquare.innerHTML = `${card.icon}<p>${card.value}</p>`;
    this.#gameEl.inPLay = setTimeout(() => {
      currSquare.classList.remove('active');
      currSquare.removeEventListener('click', this._hitPop);
      currSquare.innerHTML = currSquare.old;
      if (this.state.playing) {
        this._startPop();
      }
    }, time);
  }

  _hitPop(e) {
    const currSquare = e.target.closest('.square');
    this.state.score += currSquare.value;

    currSquare.classList.remove('active');
    currSquare.removeEventListener('click', this.hitPop);
    currSquare.innerHTML = currSquare.old;
    this._updateScoreBoard();
    if (this.state.score < 0) {
      this.state.lives--;
      if (this.state.lives < 1) {
        this.#gameOver();
      }
      this.state.score = 0;
      this._updateScoreBoard();
    }
  }

  #gameOver() {
    this.state.playing = false;
    this.state.score = 0;
    this.state.lives = 3;
    this.#statsEl.textContent = '';
    this.#gameEl.classList.add('hide');
    this.#mainEl.classList.remove('hide');
    this.#startBtn.textContent = 'Play Again';
    clearTimeout(this.#gameEl.inPLay);
  }

  _random() {
    const squares = document.querySelectorAll('.square');
    const idx = Math.floor(Math.random() * squares.length);
    if (squares[idx].count === this.#gameEl.last) {
      return this._random();
    }
    this.#gameEl.last = squares[idx].count;
    return squares[idx];
  }
}

const game = new Game();
