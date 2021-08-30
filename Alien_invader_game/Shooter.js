class Shooter {
  #parentEl;
  constructor(parentEl, speed) {
    this.speed = speed;
    this.#parentEl = parentEl;
    return this.render();
  }
  render() {
    const shooter = document.createElement('div');
    shooter.setAttribute('class', 'shooter');
    shooter.speed = this.speed;
    shooter.x = this.#parentEl.clientWidth / 2 - 50;
    shooter.style.left = shooter.x + 'px';
    return shooter;
  }
}

export default Shooter;
