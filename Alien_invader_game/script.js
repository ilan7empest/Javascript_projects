import Shooter from './Shooter.js';
import Bullet from './Bullet.js';
import Enemy from './Enemy.js';

class Game {
  #gameArea = document.querySelector('#gameArea');
  #startBtn = document.querySelector('#startBtn');
  #score = document.querySelector('#score');
  constructor() {
    this.state = {
      inPlay: false,
      isShooting: true,
      score: 0,
      level: 1,
    };
    this.enemies = {
      el: [],
      speed: 5,
      amount: 5,
    };
    this.bullets = {
      el: [],
      total: 0,
    };
    this.shooter = new Shooter(this.#gameArea, 10);
    this.gameAreaRect = this.#gameArea.getBoundingClientRect();
    this.keys = {};
    this._events();
  }

  _events() {
    this.#startBtn.addEventListener('click', this.#startGame.bind(this));
  }
  _handleKey(e) {
    if (e.type == 'keydown') {
      this.keys[e.code] = true;
    }
    if (e.type == 'keyup') {
      this.keys[e.code] = false;
    }
  }

  #startGame(e) {
    e.target.classList.add('hide');
    document.addEventListener('keydown', this._handleKey.bind(this));
    document.addEventListener('keyup', this._handleKey.bind(this));

    this.state.inPlay = true;
    this.state.score = 0;
    this.state.level = 1;
    this.#gameArea.appendChild(this.shooter);

    this.#placeEnemies(this.enemies.amount);

    window.requestAnimationFrame(this.#animateGame.bind(this));
  }

  #animateGame() {
    if (this.state.inPlay) {
      this.#handleShooter();
      this.#animateEnemy();
      if (this.enemies.el.length == 0) {
        this.#nextLevel();
      }

      window.requestAnimationFrame(this.#animateGame.bind(this));
    }
  }

  #nextLevel() {
    this.state.level++;
    this.enemies.amount += 5;
    this.enemies.speed = 5;
    this.#placeEnemies(this.enemies.amount);
  }
  #gameOver() {
    console.log('game Over');
    this.state.inPlay = false;
    this.#startBtn.classList.remove('hide');
    document.removeEventListener('keydown', this._handleKey.bind(this));
    document.removeEventListener('keyup', this._handleKey.bind(this));
  }

  #placeEnemies(num) {
    const enemyWidth = 80;
    const tempRowWidth = this.#gameArea.clientWidth - enemyWidth;

    const row = {
      x: 20, //(tempRowWidth % enemyWidth) / 2
      y: 50,
    };
    for (let i = 0; i < num; i++) {
      if (row.x > tempRowWidth - enemyWidth) {
        row.x = 20; // (tempRowWidth % enemyWidth) / 2
        row.y += 70;
      }
      this.#createEnemy(row, enemyWidth);
      row.x += enemyWidth + 10;
    }
  }

  #createEnemy(row, enemyWidth) {
    const enemy = new Enemy(enemyWidth, this.enemies.speed);
    this.enemies.el.push(enemy);
    this.#gameArea.appendChild(enemy);

    enemy.style.left = Math.floor(row.x) + 'px';
    enemy.style.top = Math.floor(row.y) + 'px';
  }

  #animateEnemy() {
    this.enemies.el.forEach((enemy) => {
      if (
        enemy.offsetLeft + enemy.clientWidth > this.#gameArea.clientWidth ||
        enemy.offsetLeft < 0
      ) {
        enemy.direction *= -1;
        enemy.style.top = enemy.offsetTop + 70 + 'px';
      }

      if (enemy.offsetTop + enemy.clientHeight > this.shooter.offsetTop) {
        this.#gameOver();
      }

      enemy.style.left =
        enemy.offsetLeft + this.enemies.speed * enemy.direction + 'px';
    });
  }

  #handleShooter() {
    if (this.keys['ArrowLeft'] && this.shooter.offsetLeft > 0) {
      this.shooter.style.left =
        this.shooter.offsetLeft - this.shooter.speed + 'px';
    }
    if (
      this.keys['ArrowRight'] &&
      this.shooter.offsetLeft <
        this.#gameArea.clientWidth - this.shooter.clientWidth
    ) {
      this.shooter.style.left =
        this.shooter.offsetLeft + this.shooter.speed + 'px';
    }
    if (
      (this.keys['Space'] || this.keys['ArrowUp']) &&
      this.state.isShooting &&
      this.bullets.total < 5
    ) {
      this.#createBullet();
    }

    return;
  }
  //  Bullet
  #createBullet() {
    const bullet = new Bullet();
    this.bullets.el.push(bullet);
    this.#gameArea.appendChild(bullet);

    bullet.style.top = this.shooter.offsetTop - bullet.clientHeight + 'px';
    bullet.style.left =
      this.shooter.offsetLeft +
      this.shooter.clientWidth / 2 -
      bullet.clientWidth / 2 +
      'px';

    this.bullets.total++;
    this.state.isShooting = false;

    window.requestAnimationFrame(this.#animateBullet.bind(this, bullet));

    setTimeout(() => {
      this.state.isShooting = true;
    }, 300);
  }

  #animateBullet(bullet) {
    if (this.state.inPlay) {
      // bullet.offsetTop + bullet.clientHeight < 0 ||
      if (this.#isCollide(bullet)) {
        console.log('hit');
        this.bullets.el = this.bullets.el.filter((blt) => blt !== bullet);
        this.#gameArea.removeChild(bullet);
        this.bullets.total--;
        window.cancelAnimationFrame(this.#animateBullet.bind(this));
      } else {
        bullet.style.top = bullet.offsetTop - bullet.speed + 'px';

        window.requestAnimationFrame(this.#animateBullet.bind(this, bullet));
      }
    }
  }

  #isCollide(bullet) {
    const bulletRect = bullet.getBoundingClientRect();
    this.enemies.el.forEach((enemy) => {
      const enemyRect = enemy.getBoundingClientRect();

      return !(
        bulletRect.top > enemyRect.bottom || bulletRect.bottom < enemyRect.top
      );
    });
  }

  #handleCollision() {
    if (this.enemies.speed <= 10) {
      this.enemies.speed++;
    }

    this.state.score += 100;
    this.#gameArea.removeChild(enemy);
    this.enemies.el = this.enemies.el.filter((en) => en !== enemy);
    this.#score.textContent = this.state.score;
  }
}

new Game();
