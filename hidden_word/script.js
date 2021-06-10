(function Game() {
  const words = ['javascript', 'reactjs', 'html', 'python', 'nodejs'];

  const btn = document.querySelector('#start');
  const message = document.querySelector('#message');
  const gameArea = document.querySelector('#gameArea');

  btn.addEventListener('click', startGame);
  messanger('Click Start');

  let currWord = 0;
  let startTime = null;

  function startGame() {
    currWord = 0;
    startTime = new Date();
    this.style.display = 'none';
    gameArea.textContent = '';
    scramble();
    nextWord();
  }
  function scramble() {
    words.forEach((word) => {
      const scrambled = word
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
      createButton(word, scrambled);
    });
    words.sort(() => 0.5 - Math.random());
  }
  function createButton(word, scrambled) {
    const btn = document.createElement('button');
    btn.textContent = scrambled;
    btn.classList.add('button');
    btn.word = word;
    const overlay = document.createElement('div');
    overlay.setAttribute(
      'style',
      'position:absolute;top:0;left:0;width:100%;height:100%;background:red;color:#fff;line-height:26px;transition: all 0.5s ease;'
    );
    overlay.textContent = 'Select';
    btn.appendChild(overlay);

    btn.addEventListener('mouseover', () => {
      overlay.style.top = '-100%';
    });
    btn.addEventListener('mouseout', () => {
      overlay.style.top = '0';
    });
    btn.addEventListener('click', hit);
    gameArea.appendChild(btn);
  }

  function hit(e) {
    if (e.target.word === words[currWord]) {
      e.target.textContent = '';
      currWord++;
      nextWord();
      e.target.removeEventListener('click', hit);
    }
  }
  function nextWord() {
    if (currWord >= words.length) {
      gameOver();
    } else {
      messanger(`Select the word: ${words[currWord]}`);
    }
  }

  function gameOver() {
    const totalTime = parseFloat((new Date() - startTime) / 1000);
    messanger(`Game Over! It took you ${totalTime} seconds`);
    btn.style.display = 'block';
    btn.textContent = 'Play Again?';
  }

  function messanger(msg) {
    message.textContent = msg;
  }
})();
