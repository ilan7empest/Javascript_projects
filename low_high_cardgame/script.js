const cardRanks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const cardPips = ['hearts', 'spades', 'clubs', 'diams'];

class Game {
  #messageEl = document.querySelector('#mesaage');
  #scoreEl = document.querySelector('#score');
  #btns = Array.from(document.querySelectorAll('button'));
  #deckEl = document.querySelector('#deck');
  constructor() {
    this.state = {
      score: 0,
      currCard: 0,
      deck: [],
    };
    this.events();
  }
  events() {
    for (let btn of this.#btns) {
      btn.addEventListener('click', (e) => this.#startGame(e));
    }
  }

  #startGame(e) {
    const btnID = e.target.id;
    const newCard = this._drawCard();
    if (btnID === 'start') {
      this.#messageEl.textContent = 'Higher or Lower?';
      this.#deckEl.innerHTML = '';
      this.state.score = 0;
      this.#scoreEl.innerHTML = this.state.score;
      this._createCard(newCard);
      this._toggleButtons();
      return;
    }
    this._checkResults(newCard, btnID);
    this._createCard(newCard);
  }
  _toggleButtons() {
    for (let btn of this.#btns) {
      btn.classList.toggle('hide');
    }
  }

  _createDeck() {
    this.state.deck = [];
    for (let rank = 0; rank < cardRanks.length; rank++) {
      for (let pip = 0; pip < cardPips.length; pip++) {
        let card = {
          rank: cardRanks[rank],
          pip: cardPips[pip],
          value: rank + 1,
        };
        this.state.deck.push(card);
      }
    }
  }

  _drawCard() {
    const deck = this.state.deck;
    if (deck.length > 0) {
      const cardIdx = Math.floor(Math.random() * deck.length);
      const [card] = deck.splice(cardIdx, 1);
      return card;
    } else {
      this._createDeck();
      return this._drawCard();
    }
  }

  _createCard(cardObj) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.classList.add(cardObj.pip);
    card.innerHTML = `${cardObj.rank} <br /> <i>&${cardObj.pip};</i>`;
    const cards = document.querySelectorAll('.card');
    card.style.left = cards.length * 30 + 'px';
    this.#deckEl.appendChild(card);
    this.state.currCard = cardObj.value;
  }

  _checkResults(card, btn) {
    const sum = card.value - this.state.currCard;
    if ((btn == 'higher' && sum >= 0) || (btn == 'lower' && sum <= 0)) {
      this.state.score++;
    } else {
      this.state.score = 0;
    }
    this.#scoreEl.innerHTML = this.state.score;

    if (this.state.deck.length === 0) {
      this.#gameOver();
    }
  }

  #gameOver() {
    this._toggleButtons();
    this.#messageEl.innerHTML = 'Game over. Start Again?';
  }
}

const game = new Game();

console.log(game);
