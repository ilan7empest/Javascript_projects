class Catcher {
  constructor() {
    return this.#create();
  }
  #create() {
    const catcher = document.createElement('div');
    catcher.setAttribute('class', 'catcher');
    catcher.speed = 5;
    return catcher;
  }
}

class Brick {
  constructor() {
    return this.#create();
  }
  #create() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
    enemy.speed = Math.floor(Math.random() * 5) + 2;
    return enemy;
  }
}

class Game {
  #score = document.querySelector('#score');
  #totalBricks = document.querySelector('#totalBricks');
  #gameArea = document.querySelector('#gameArea');
  #startBtn = document.querySelector('#startBtn');
  #splashScreen = document.querySelector('.start_screen');
  #level = document.querySelector('#level');
  #catcher;
  constructor() {
    this.state = {
      inPlay: false,
      level: 1,
      score: 0,
      totalEnemies: 10,
      enemies: [],
    };
    this.keys = {};
    this._events();
    this.#catcher = new Catcher();
  }

  _events() {
    this.#startBtn.addEventListener('click', this.#startGame.bind(this));
  }
  #animateGame() {
    if (this.state.inPlay) {
      this._handleCatcher();
      if (this.state.level == 10 && this.state.enemies.length <= 0) {
        this.#endGame();
        return;
      }
      if (this.state.enemies.length <= 0) {
        this.state.totalEnemies += 5;
        this.state.level++;
        this.#createBricks();
        this.#updateLevel();
      }
      this.#animateBricks();

      window.requestAnimationFrame(this.#animateGame.bind(this));
    }
  }
  #startGame(e) {
    document.addEventListener('keydown', this._handleKeys.bind(this));
    document.addEventListener('keyup', this._handleKeys.bind(this));

    this.state.level = 1;
    this.state.score = 0;
    this.state.totalEnemies = 10;
    this.state.inPlay = true;
    this.#splashScreen.classList.add('hide');

    this.#gameArea.appendChild(this.#catcher);

    this.#createBricks();
    this.#updateScore();
    this.#updateLevel();

    window.requestAnimationFrame(this.#animateGame.bind(this));
  }

  #endGame() {
    document.removeEventListener('keydown', this._handleKeys.bind(this));
    document.removeEventListener('keyup', this._handleKeys.bind(this));
    this.state.inPlay = false;
    this.#startBtn.textContent = 'Play Again?';
    this.#splashScreen.classList.remove('hide');
    this.#gameArea.removeChild(this.#catcher);
  }

  #createBricks() {
    for (let i = 0; i < this.state.totalEnemies; i++) {
      const enemy = new Brick();
      this.state.enemies.push(enemy);
      this.#gameArea.appendChild(enemy);
      enemy.style.left =
        Math.floor(
          Math.random() * (this.#gameArea.clientWidth - enemy.clientWidth)
        ) + 'px';
      enemy.style.top = Math.random() * 1000 * -1 + 'px';
    }
    this.#updateBricks();
  }
  #animateBricks() {
    this.state.enemies.forEach((enemy) => {
      enemy.style.top = enemy.offsetTop + enemy.speed + 'px';
      if (
        this.isCollide(enemy) ||
        enemy.offsetTop > this.#gameArea.clientHeight
      ) {
        this._removeEnemy(enemy);
        this.#updateBricks();
      }
    });
  }

  #updateBricks() {
    this.#totalBricks.textContent = this.state.enemies.length;
  }
  #updateScore() {
    this.#score.textContent = this.state.score;
  }
  #updateLevel() {
    this.#level.textContent = this.state.level;
  }

  _removeEnemy(enemy) {
    this.state.enemies = this.state.enemies.filter((en) => en !== enemy);
    this.#gameArea.removeChild(enemy);
  }

  isCollide(enemy) {
    const catcherRect = this.#catcher.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (
      catcherRect.top < enemyRect.bottom &&
      catcherRect.left < enemyRect.right &&
      catcherRect.right > enemyRect.left &&
      catcherRect.bottom > enemyRect.top
    ) {
      this.state.score++;
      this.#updateScore();
      return true;
    }
    return false;
  }

  _handleCatcher() {
    if (this.keys['ArrowLeft'] && this.#catcher.offsetLeft > 0) {
      this.#catcher.style.left =
        this.#catcher.offsetLeft - this.#catcher.speed + 'px';
    }
    if (
      this.keys['ArrowRight'] &&
      this.#catcher.offsetLeft + this.#catcher.clientWidth <
        this.#gameArea.clientWidth
    ) {
      this.#catcher.style.left =
        this.#catcher.offsetLeft + this.#catcher.speed + 'px';
    }
    if (this.keys['ArrowUp'] && this.#catcher.offsetTop > 0) {
      this.#catcher.style.top =
        this.#catcher.offsetTop - this.#catcher.speed + 'px';
    }
    if (
      this.keys['ArrowDown'] &&
      this.#catcher.offsetTop + this.#catcher.clientHeight <
        this.#gameArea.clientHeight
    ) {
      this.#catcher.style.top =
        this.#catcher.offsetTop + this.#catcher.speed + 'px';
    }
  }

  _handleKeys(e) {
    if (e.type == 'keydown') {
      this.keys[e.code] = true;
    }
    if (e.type == 'keyup') {
      this.keys[e.code] = false;
    }
  }
}

new Game();
