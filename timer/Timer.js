class Timer {
  #durationInpuEl;
  #startBtnEl;
  #pauseBtnEl;
  #interval;
  isPlaying = false;
  constructor(callbacks) {
    this._generateTemplate();
    this._events();
    if (callbacks) {
      for (let key in callbacks) {
        this[key] = callbacks[key];
      }
    }
  }
  _events() {
    this.#startBtnEl.addEventListener('click', this.start.bind(this));
    this.#pauseBtnEl.addEventListener('click', this.pause.bind(this));
    this.#durationInpuEl.addEventListener('click', (e) => e.target.select());
  }

  start() {
    if (this.timeRemaining <= 0) {
      return;
    }
    if (!this.isPlaying) {
      if (this.onStart) this.onStart(this.timeRemaining);
      this.tick();
      this.#interval = setInterval(this.tick.bind(this), 50);
      this.isPlaying = true;
    }
  }
  pause() {
    clearInterval(this.#interval);
    this.isPlaying = false;
  }
  tick() {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) this.onComplete();
      return;
    }
    this.timeRemaining = this.timeRemaining - 0.05;
    if (this.onTick) this.onTick(this.timeRemaining);
  }

  get timeRemaining() {
    return parseFloat(this.#durationInpuEl.value);
  }
  set timeRemaining(newTime) {
    this.#durationInpuEl.value = newTime.toFixed(2);
  }
  onDurationChange() {}

  _generateTemplate() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('controls');
    const controls = document.createElement('div');
    this.#durationInpuEl = document.createElement('input');
    this.#durationInpuEl.type = 'number';
    this.#durationInpuEl.value = 30;
    this.#startBtnEl = document.createElement('button');
    this.#startBtnEl.innerHTML = `<i class="fas fa-play"></i>`;
    this.#pauseBtnEl = document.createElement('button');
    this.#pauseBtnEl.innerHTML = `<i class="fas fa-pause"></i>`;

    controls.append(this.#startBtnEl, this.#pauseBtnEl);
    wrapper.append(this.#durationInpuEl, controls);
    document.querySelector('.timer').appendChild(wrapper);
  }
}

export default Timer;
