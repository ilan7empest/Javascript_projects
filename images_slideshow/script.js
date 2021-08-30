function rndColor() {
  const hex = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
  return hex() + hex() + hex();
}

const Images = [
  {
    img: `https://via.placeholder.com/250/${rndColor()}/${rndColor()}?text=Image1`,
    caption: 'Hello Image 1',
  },
  {
    img: `https://via.placeholder.com/250/${rndColor()}/${rndColor()}?text=Image2`,
    caption: 'Hello Image 2',
  },
  {
    img: `https://via.placeholder.com/250/${rndColor()}/${rndColor()}?text=Image3`,
    caption: 'Hello Image 3',
  },
];

class Slideshow {
  #root = document.querySelector('#root');
  #slideshowEl;
  constructor(images) {
    this.state = {
      slideIdx: 0,
      timer: null,
    };
    this.images = images;
    this.#createSlideContainer();
    this.#createIndicator();
    this._playSlide();
  }

  #createSlideContainer() {
    this.#slideshowEl = document.createElement('div');
    this.#slideshowEl.setAttribute('class', 'slideContainer');
    this.#createSlide();
    this.#root.appendChild(this.#slideshowEl);
  }
  #createSlide() {
    this.images.forEach(({ img, caption }, i) => {
      const slide = document.createElement('div');
      slide.setAttribute('class', 'slide fade');
      slide.Idx = i;

      const imgEl = document.createElement('img');
      imgEl.src = img;
      imgEl.alt = caption;

      const cap = document.createElement('div');
      cap.classList.add('caption');
      cap.textContent = caption;

      slide.appendChild(imgEl);
      slide.appendChild(cap);

      this.#slideshowEl.appendChild(slide);
    });
  }
  #createIndicator() {
    const indicatorEl = document.createElement('ul');
    indicatorEl.classList.add('indicator');

    this.images.forEach((_, i) => {
      const imgDot = document.createElement('li');
      imgDot.classList.add('dot');
      imgDot.Idx = i;
      imgDot.addEventListener('click', this._moveSlide.bind(this));
      indicatorEl.appendChild(imgDot);
    });
    this.#root.appendChild(indicatorEl);
  }

  _playSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (this.state.slideIdx > slides.length - 1) {
      this.state.slideIdx = 0;
    }
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[this.state.slideIdx].classList.add('active');
    this.state.slideIdx++;
    this.state.timer = setTimeout(this._playSlide.bind(this), 3000);
  }

  _moveSlide(e) {
    clearTimeout(this.state.timer);
    this.state.slideIdx = e.target.Idx;
    this._playSlide();
  }
}

new Slideshow(Images);
