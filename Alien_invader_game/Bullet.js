class Bullet {
  constructor() {
    return this.render();
  }
  render() {
    const bullet = document.createElement('div');
    bullet.style.width = '20px';
    bullet.style.height = '20px';
    bullet.style.backgroundColor = '#fff';
    bullet.style.borderRadius = '50%';
    bullet.style.position = 'absolute';
    bullet.speed = 5;
    return bullet;
  }
}

export default Bullet;
