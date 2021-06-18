class Bird {
  constructor() {
    return this.#create();
  }
  #create() {
    const bird = document.createElement('div');
    bird.setAttribute('class', 'bird');

    const wing = document.createElement('span');
    wing.classList.add('wing');

    bird.appendChild(wing);
    return bird;
  }
}

class Pipe {
  constructor(num) {
    this.num = num;
    return this.#create();
  }
  #create() {
    const totalHeight = document.body.offsetHeight;
    const pipe = document.createElement('div');
    pipe.setAttribute('class', 'pipe');
    pipe.height = Math.floor(Math.random() * (totalHeight / 2)) + 150;
    pipe.style.height = pipe.height + 'px';
    pipe.style.width = Math.floor(Math.random() * 100) + 100 + 'px';
    pipe.style.position = 'absolute';
    pipe.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);

    return pipe;
  }
}

class Game {
  #starScreen = document.querySelector('.startScreen');
  #message = document.querySelector('.message');
  #gameArea = document.querySelector('#gameArea');
  #score = document.querySelector('#score');
  #bird;
  constructor() {
    this.state = {
      isPlaying: false,
      score: 0,
    };
    this.keys = {};
    this.pipe = 0;
    this.pipes = [];
    this._events();
  }
  _events() {
    this.#starScreen.addEventListener('click', this.#startGame.bind(this));
  }
  #startGame(e) {
    e.target.classList.add('hide');
    this.#message.classList.add('hide');
    this.state.isPlaying = true;
    this.state.score = 0;
    this.pipe = 0;
    if (this.state.isPlaying) {
      //Add Key Event Listeners
      document.addEventListener('keydown', this._handleKeyPress.bind(this));
      document.addEventListener('keyup', this._handleKeyPress.bind(this));
      //Create Bird
      this.#gameArea.innerHTML = '';
      this.#bird = new Bird();
      this.#gameArea.appendChild(this.#bird);
      //Add bird attr
      this.#bird.posX = this.#bird.offsetLeft;
      this.#bird.posY = this.#bird.offsetTop;
      this.#bird.speed = 4;

      //Add Pipes
      const spacing = Math.floor(Math.random() * 400) + 200;
      const pipes = Math.floor(this.#gameArea.clientWidth / spacing);

      for (let i = 0; i <= pipes; i++) {
        this.#createPipes(this.pipe * spacing);
      }
      //Start game animation
      window.requestAnimationFrame(this.#animateGame.bind(this));
    }
  }

  #createPipes(startPos) {
    this.pipe++;
    let pipe = new Pipe(this.pipe);
    pipe.start = startPos + this.#gameArea.offsetWidth;
    pipe.style.top = '0px';
    pipe.style.left = pipe.start + 'px';
    this.#gameArea.appendChild(pipe);

    let pipeVSpace = 300;

    let pipe2 = new Pipe(this.pipe);
    pipe2.style.bottom = '0px';
    pipe2.style.width = pipe.clientWidth + 'px';
    pipe2.style.height = pipe.clientHeight - pipeVSpace + 'px';
    pipe2.style.left = pipe.start + 'px';
    this.pipes.push(pipe, pipe2);
    this.#gameArea.appendChild(pipe2);
  }

  #gameOver() {
    this.state.isPlaying = false;
    this.#bird.setAttribute('style', 'transform:rotate(180deg)');
    this.#starScreen.classList.remove('hide');
    this.#message.textContent = 'Game Over';
    this.#message.classList.remove('hide');
  }

  #animateGame() {
    if (this.state.isPlaying) {
      this._handleBirdMovments();

      this.state.score++;
      this.#score.textContent = this.state.score;

      this.#animatePipe();

      this.#bird.style.left = this.#bird.posX + 'px';
      this.#bird.style.top = this.#bird.posY + 'px';
      window.requestAnimationFrame(this.#animateGame.bind(this));
    }
  }
  #checkCollision(pipe) {
    const pipeRect = pipe.getBoundingClientRect();
    const birdRect = this.#bird.getBoundingClientRect();

    if (
      birdRect.right > pipeRect.left &&
      birdRect.bottom > pipeRect.top &&
      birdRect.top < pipeRect.bottom &&
      birdRect.left < pipeRect.right
    ) {
      return true;
    }
    // if (birdRect.bottom > pipeRect.top) {
    //   return true;
    // }
  }
  #animatePipe() {
    let counter = 0;
    this.pipes.forEach((pipe) => {
      pipe.style.left = pipe.offsetLeft - 2 + 'px';
      if (pipe.offsetLeft + pipe.clientWidth < 0) {
        this.#gameArea.removeChild(pipe);
        this.pipes.filter((p) => p !== pipe);
        counter++;
      }
      if (this.#checkCollision(pipe)) {
        this.#gameOver();
      }
    });

    counter = counter / 2;
    for (let i = 0; i < counter; i++) {
      this.#createPipes(0);
    }
  }

  _handleBirdMovments() {
    this.#bird.classList.remove('flap');
    if (
      this.#bird.posY <
      this.#gameArea.clientHeight - this.#bird.clientHeight
    ) {
      this.#bird.posY += this.#bird.speed / 2;
      if (this.keys['ArrowDown']) {
        this.#bird.posY += this.#bird.speed;
      }
    }
    if (
      (this.keys['ArrowUp'] || this.keys['Space']) &&
      this.#bird.posY > this.#score.parentElement.clientHeight
    ) {
      this.#bird.posY -= this.#bird.speed;
      this.#bird.classList.add('flap');
    }

    if (this.keys['ArrowLeft'] && this.#bird.posX > 0) {
      this.#bird.posX -= this.#bird.speed;
      this.#bird.classList.add('flap');
    }
    if (
      this.keys['ArrowRight'] &&
      this.#bird.posX < this.#gameArea.clientWidth - this.#bird.clientWidth
    ) {
      this.#bird.posX += this.#bird.speed;
      this.#bird.classList.add('flap');
    }
  }

  _handleKeyPress(e) {
    e.preventDefault();
    if (e.type === 'keydown') {
      this.keys[e.code] = true;
    }
    if (e.type === 'keyup') {
      this.keys[e.code] = false;
    }
  }
}

new Game();
