class Enemy {
  constructor(width, speed) {
    this.speed = speed;
    this.width = width;
    return this.render();
  }
  render() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
    enemy.style.width = this.width + 'px';
    enemy.speed = this.speed;
    enemy.direction = 1;

    const eye1 = this.#creareEl('eye');
    eye1.style.left = '10px';

    const eye2 = this.#creareEl('eye');
    eye2.style.right = '10px';

    const mouth = this.#creareEl('mouth');

    enemy.appendChild(eye1);
    enemy.appendChild(eye2);
    enemy.appendChild(mouth);
    return enemy;
  }

  #creareEl(className) {
    const el = document.createElement('span');
    el.classList.add(className);
    return el;
  }
}
export default Enemy;
