class Game {
  #scoreEl = document.querySelector('.score');
  #startScreen = document.querySelector('.startScreen');
  #gameArea = document.querySelector('#gameArea');
  #myCar;
  #myEnemies;
  #lines;
  #positions = [0, 55, 110, 150];
  constructor() {
    this.state = {
      inPLay: false,
      score: 0,
      road: {},
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
      },
    };
    this._events();
  }

  _events() {
    this.#startScreen.addEventListener('click', this.startGame.bind(this));
    window.addEventListener('keydown', this.#handleKeyDown.bind(this));
    window.addEventListener('keyup', this.#handleKeyUp.bind(this));
  }

  startGame(e) {
    this.state.inPLay = true;
    this.state.score = 0;
    e.target.classList.add('hide');
    this.#gameArea.classList.remove('hide');

    this.state.road = this.#gameArea.getBoundingClientRect();

    this.#createLines();
    this.#createCar();
    this.#createEnemies();

    requestAnimationFrame(this.#animateGame.bind(this));
  }

  endGame() {
    this.state.inPLay = false;
    this.#scoreEl.innerHTML = 'GAME OVER <br> Score: ' + this.state.score;
  }

  #animateGame() {
    if (this.state.inPLay) {
      this.#animateLines();
      this.#animateEnemies();
      this.#handleCarMovements();
      this.state.score++;
      this.#scoreEl.innerHTML = 'Score:' + this.state.score;
      requestAnimationFrame(this.#animateGame.bind(this));
    }
  }

  #createCar() {
    this.#myCar = new Car('car');
    this.#myCar.speed = 5;
    this.#myCar.x = this.#myCar.offsetLeft;
    this.#myCar.y = this.#myCar.offsetTop;
    this.#gameArea.insertAdjacentElement('afterbegin', this.#myCar);
  }

  #createEnemies() {
    const enemies = [];
    for (let idx = 0; idx < 3; idx++) {
      const enemy = new Car('car enemy');
      enemy.style.backgroundColor = this._randomColor();
      enemy.speed = Math.floor(Math.random() * 5) + 1;
      enemy.y = (idx + 1) * 600 * -1;
      enemy.style.left =
        this.#positions[Math.floor(Math.random() * this.#positions.length)] +
        'px';
      enemy.style.top = enemy.y + 'px';
      this.#gameArea.insertAdjacentElement('afterbegin', enemy);
      enemies.push(enemy);
    }
    this.#myEnemies = enemies;
  }

  #animateEnemies() {
    this.#myEnemies.forEach((enemy, i) => {
      const isCollide = this.#detectCollosion(this.#myCar, enemy);
      if (isCollide) {
        this.endGame();
      }
      if (enemy.y >= this.state.road.height + 200) {
        enemy.style.backgroundColor = this._randomColor();
        enemy.y = -this.state.road.height;
        enemy.style.left =
          this.#positions[Math.floor(Math.random() * this.#positions.length)] +
          'px';
      }
      enemy.y += enemy.speed;
      enemy.style.top = enemy.y + 'px';
    });
  }

  #createLines() {
    const lines = [];
    for (let idx = 0; idx < 9; idx++) {
      const line = new Line();
      line.y = 150 * idx;
      line.style.top = 150 * idx + 'px';
      this.#gameArea.insertAdjacentElement('afterbegin', line);
      lines.push(line);
    }
    this.#lines = lines;
  }

  #animateLines() {
    this.#lines.forEach((line) => {
      if (line.y > this.#lines.length * 150) {
        line.y -= this.#lines.length * 150;
      }
      line.y += this.#myCar.speed;
      line.style.top = line.y + 'px';
    });
  }

  #handleCarMovements() {
    if (this.state.keys.ArrowUp && this.#myCar.y > this.state.road.top) {
      this.#myCar.y -= this.#myCar.speed;
    }
    if (this.state.keys.ArrowDown && this.#myCar.y < this.state.road.bottom) {
      this.#myCar.y += this.#myCar.speed;
    }
    if (this.state.keys.ArrowLeft && this.#myCar.x > 0) {
      this.#myCar.x -= this.#myCar.speed;
    }
    if (
      this.state.keys.ArrowRight &&
      this.#myCar.x < this.state.road.width - 50
    ) {
      this.#myCar.x += this.#myCar.speed;
    }
    this.#myCar.style.left = this.#myCar.x + 'px';
    this.#myCar.style.top = this.#myCar.y + 'px';
  }

  #detectCollosion(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.left > bRect.right ||
      aRect.right < bRect.left
    );
  }

  #handleKeyDown(e) {
    const key = e.key;
    if (!(key in this.state.keys)) return;
    this.state.keys[key] = true;
  }
  #handleKeyUp(e) {
    const key = e.key;
    if (!(key in this.state.keys)) return;
    this.state.keys[key] = false;
  }

  _randomColor() {
    let hex = '#';
    let cnt = 0;
    while (cnt < 3) {
      hex += Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0');
      cnt++;
    }
    return hex;
  }
}

class Line {
  constructor() {
    return this.#render();
  }
  #render() {
    const line = document.createElement('div');
    line.setAttribute('class', 'line');
    return line;
  }
}

class Car {
  constructor(className) {
    return this.#render(className);
  }
  #render(className) {
    const car = document.createElement('div');
    car.setAttribute('class', className);
    car.textContent = 'Car';
    return car;
  }
}

const game = new Game();
console.log(game);
// class Game {
//   #scoreEl = document.querySelector('.score');
//   #startScreen = document.querySelector('.startScreen');
//   #gameArea = document.querySelector('#gameArea');

//   constructor() {
//     this._events();
//     this.state = {
//       score: 0,
//       playing: false,
//       car: {
//         el: null,
//         speed: 5,
//         position: {
//           x: 0,
//           y: 0,
//         },
//       },
//       road: {
//         width: 0,
//         top: 0,
//         bottom: 0,
//       },
//       keys: {
//         ArrowUp: false,
//         ArrowDown: false,
//         ArrowLeft: false,
//         ArrowRight: false,
//       },
//     };
//   }

//   _events() {
//     this.#startScreen.addEventListener('click', this.#startGame.bind(this));
//     document.addEventListener('keydown', this.#handleKeyDown.bind(this));
//     document.addEventListener('keyup', this.#handleKeyUp.bind(this));
//   }
//   _animateCar() {
//     if (this.state.playing) {
//       this._animateLines();
//       if (
//         this.state.keys.ArrowUp &&
//         this.state.car.position.y > this.state.road.top
//       )
//         this.state.car.position.y -= this.state.car.speed;
//       if (
//         this.state.keys.ArrowDown &&
//         this.state.car.position.y < this.state.road.bottom
//       )
//         this.state.car.position.y += this.state.car.speed;
//       if (this.state.keys.ArrowLeft && this.state.car.position.x > 0)
//         this.state.car.position.x -= this.state.car.speed;
//       if (
//         this.state.keys.ArrowRight &&
//         this.state.car.position.x < this.state.road.width - 50
//       )
//         this.state.car.position.x += this.state.car.speed;

//       this.state.car.el.style.left = this.state.car.position.x + 'px';
//       this.state.car.el.style.top = this.state.car.position.y + 'px';
//       window.requestAnimationFrame(this._animateCar.bind(this));
//     }
//   }

//   _animateLines() {
//     const lines = Array.from(document.querySelectorAll('.line'));
//     lines.forEach((line) => {
//       if (line.y > 1500) {
//         line.y -= 1500;
//       }
//       line.y += this.state.car.speed;
//       line.style.top = line.y + 'px';
//     });
//   }
//   #createLines() {
//     for (let x = 0; x < 10; x++) {
//       const line = document.createElement('div');
//       line.classList.add('line');
//       line.y = x * 150;
//       line.style.top = x * 150 + 'px';
//       this.#gameArea.appendChild(line);
//     }
//   }

//   #startGame() {
//     this.state.playing = true;
//     this.#startScreen.classList.add('hide');
//     this.#gameArea.classList.remove('hide');
//     this.#createLines();
//     this.state.car.el = new Car().render;
//     this.state.car.position.y = this.state.car.el.offsetTop;
//     this.state.car.position.x = this.state.car.el.offsetLeft;
//     const { width, top, bottom } = this.#gameArea.getBoundingClientRect();
//     this.state.road = {
//       width,
//       top,
//       bottom,
//     };
//     this.#gameArea.appendChild(this.state.car.el);
//     window.requestAnimationFrame(this._animateCar.bind(this));
//   }

//   #handleKeyDown(e) {
//     const { key } = e;
//     this.state.keys[key] = true;
//   }
//   #handleKeyUp(e) {
//     const { key } = e;
//     this.state.keys[key] = false;
//   }
// }

// class Car {
//   #render() {
//     const car = document.createElement('div');
//     car.textContent = 'car';
//     car.setAttribute('class', 'car');
//     return car;
//   }
//   get render() {
//     return this.#render();
//   }
// }

// const game = new Game();

// console.log(game);
