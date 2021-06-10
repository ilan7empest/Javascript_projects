function Plane() {
  let plane = document.createElement('div');
  plane.setAttribute('class', 'plane');

  return plane;
}

function Enemy() {
  let enemy = document.createElement('div');
  enemy.setAttribute('class', 'enemy');
  enemy.style.width = Math.floor(Math.random() * 200) + 10 + 'px';
  enemy.style.height = Math.floor(Math.random() * 400) + 50 + 'px';
  enemy.style.left =
    Math.floor(Math.random() * (document.documentElement.clientWidth - 200)) +
    50 +
    'px';
  return enemy;
}

function Bomb() {
  let bomb = document.createElement('div');
  bomb.setAttribute('class', 'bomb');
  return bomb;
}

function Game() {
  const message = document.querySelector('#message');
  const score = document.querySelector('#score');
  const gameArea = document.querySelector('#gameArea');

  let state = {
    player: {
      score: 0,
      level: 1,
      speed: 3,
      totalBombs: 2,
      isBombing: true,
      inplay: false,
    },
    keys: {
      space: false,
    },
  };

  document.addEventListener('keydown', handleKeysOn);
  document.addEventListener('keyup', handleKeysOff);
  message.addEventListener('click', startGame);

  function startGame() {
    message.style.display = 'none';
    if (!state.player.inplay) {
      gameArea.textContent = '';
      state.player.score = 2000;
      state.player.inplay = true;
      state.player.activeBombs = 0;

      state.player.plane = new Plane();
      gameArea.appendChild(state.player.plane);
      state.player.plane.x = state.player.plane.offsetLeft;
      state.player.plane.y = state.player.plane.offsetTop;

      state.enemy = new Enemy();
      gameArea.appendChild(state.enemy);

      window.requestAnimationFrame(animatePlane);
    }
  }

  function animatePlane() {
    if (state.player.inplay) {
      handlePlaneMovements();
      state.player.score =
        state.player.score >= 0 ? --state.player.score : gameOver();
      score.innerHTML = `Score: ${state.player.score} <br>
      Level: ${state.player.level}`;

      if (state.player.plane.x > gameArea.clientWidth) {
        state.player.plane.x = -state.player.plane.clientWidth;
        state.player.score -= 100;
      }
      state.player.plane.x += state.player.speed * 2;
      state.player.plane.style.top = state.player.plane.y + 'px';
      state.player.plane.style.left = state.player.plane.x + 'px';
      window.requestAnimationFrame(animatePlane);
    }
  }

  function animateBomb(bomb) {
    if (state.player.inplay) {
      bomb.style.top = bomb.offsetTop + state.player.speed + 'px';
      bomb.style.left = bomb.offsetLeft + 2 + 'px';
      if (bomb.offsetLeft > gameArea.clientWidth) {
        bomb.style.left = -bomb.clientWidth + 'px';
      }
      if (bomb.offsetTop > document.documentElement.clientHeight) {
        bomb.parentElement.removeChild(bomb);
        state.player.activeBombs--;
        window.cancelAnimationFrame(animateBomb);
      }
      if (detectCollision(bomb)) {
        state.player.score += 2000;
        state.player.level++;
        bomb.remove();
        state.player.activeBombs--;
        state.enemy.remove();

        state.enemy = new Enemy();
        gameArea.appendChild(state.enemy);
      } else {
        window.requestAnimationFrame(() => animateBomb(bomb));
      }
    }
  }

  function handlePlaneMovements() {
    if (state.keys['ArrowUp'] && state.player.plane.y > 80) {
      state.player.plane.y -= state.player.speed;
    }
    if (state.keys['ArrowDown'] && state.player.plane.y <= 300) {
      state.player.plane.y += state.player.speed;
    }
    if (state.keys['ArrowLeft'] && state.player.plane.x > 0) {
      state.player.plane.x -= state.player.speed;
    }
    if (
      state.keys['ArrowRight'] &&
      state.player.plane.x <
        gameArea.clientWidth - state.player.plane.clientWidth
    ) {
      state.player.plane.x += state.player.speed;
    }
    if (state.keys['space']) {
      if (
        state.player.isBombing &&
        state.player.activeBombs < state.player.totalBombs
      ) {
        const bomb = new Bomb();
        state.player.activeBombs++;
        state.player.score -= 300;
        bomb.style.top = state.player.plane.y + 'px';
        bomb.style.left = state.player.plane.x + 'px';
        gameArea.appendChild(bomb);
        state.player.isBombing = false;

        window.requestAnimationFrame(() => animateBomb(bomb));

        setTimeout(() => (state.player.isBombing = true), 500);
      }
    }
  }

  function detectCollision(bomb) {
    const enemyRect = document.querySelector('.enemy').getBoundingClientRect();
    const bombRect = bomb.getBoundingClientRect();

    return !(
      bombRect.bottom < enemyRect.top ||
      bombRect.top > enemyRect.bottom ||
      bombRect.right < enemyRect.left ||
      bombRect.left > enemyRect.right
    );
  }

  function gameOver() {
    message.textContent = 'Game Over';
    message.style.display = 'block';
    state.player.inplay = false;

    return 0;
  }

  function handleKeysOn(e) {
    e.preventDefault();
    let tempKey = e.key === ' ' ? 'space' : e.key;
    state.keys[tempKey] = true;
  }
  function handleKeysOff(e) {
    e.preventDefault();
    let tempKey = e.key === ' ' ? 'space' : e.key;
    state.keys[tempKey] = false;
  }

  return state;
}

new Game();
