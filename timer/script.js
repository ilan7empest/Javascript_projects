import Timer from './Timer.js';

const circle = document.querySelector('#circle');
const perimeter = +circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let totalTime = 0;
new Timer({
  onStart(time) {
    totalTime = time;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / totalTime - perimeter
    );
  },
  onComplete() {},
});
