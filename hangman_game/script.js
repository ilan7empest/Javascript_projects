const Words = ['House', 'Tree', 'Telephone'];
class Game {
  #alphabet;
  #lettersContainer = document.querySelector('.letters');
  #board = document.querySelector('.board');
  #message = document.querySelector('#message');
  #startBtn = document.querySelector('button');
  constructor() {
    this.state = {
      selectedWord: '',
      attempts: 5,
      correct: 0,
    };
    this._events();
    this.handkeLetter = this._handleLetter.bind(this);
  }

  _events() {
    this.#startBtn.addEventListener('click', this.init.bind(this));
  }
  #createLetters() {
    this.#lettersContainer.innerHTML = '';
    this.#alphabet = Array.from(Array(26)).map((e, i) =>
      String.fromCharCode(i + 65)
    );
    this.#alphabet.forEach((char) => {
      const letterEl = document.createElement('li');
      letterEl.classList.add('letter');
      letterEl.letter = char;
      letterEl.textContent = char;
      letterEl.addEventListener('click', this.handkeLetter);
      this.#lettersContainer.appendChild(letterEl);
    });
  }

  #createWord() {
    this.#board.innerHTML = '';
    this.state.selectedWord = Words.splice(
      Words[Math.floor(Math.random() * Words.length)],
      1
    )
      .toString()
      .toUpperCase();
    this.state.selectedWord.split('').forEach((l) => {
      const letterEl = document.createElement('li');
      letterEl.classList.add('letter');
      letterEl.letter = l.toUpperCase();
      this.#board.appendChild(letterEl);
    });
  }

  _handleLetter(e) {
    e.target.removeEventListener('click', this.handkeLetter);
    const hiddenLetters = Array.from(this.#board.children);

    if (!hiddenLetters.some((l) => l.letter === e.target.letter)) {
      this.state.attempts--;
    }

    hiddenLetters.forEach((child) => {
      if (child.letter === e.target.letter) {
        child.textContent = child.letter;
        e.target.classList.add('correct');
        this.state.correct++;
      } else {
        e.target.classList.add('disabled');
      }
    });
    this.#message.textContent =
      'You have ' + this.state.attempts + ' attempts left';

    if (
      this.state.attempts <= 0 ||
      this.state.correct >= this.state.selectedWord.length
    ) {
      this.#gameOver();
    }
  }

  #gameOver() {
    if (this.state.attempts <= 0) {
      this.#message.textContent = 'Game Over';
    }
    if (this.state.correct >= this.state.selectedWord.length) {
      this.#message.textContent = 'Good Job';
    }
    this.#lettersContainer.innerHTML = '';
    this.#startBtn.style.display = 'block';
    this.#startBtn.textContent = 'Play Again';
    this.state.attempts = 5;
    this.state.correct = 0;
  }

  init() {
    this.#message.textContent = '';
    this.#createLetters();
    this.#createWord();
    this.#startBtn.style.display = 'none';
  }
}

const game = new Game();

// console.log(game);
