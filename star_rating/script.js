(function () {
  const stars = document.querySelectorAll('.star');
  const message = document.querySelector('#output');
  stars.forEach((star, i) => {
    star.starValue = i + 1;
    ['mouseover', 'mouseout', 'click'].forEach((evt) =>
      star.addEventListener(evt, starRate)
    );
  });

  function starRate(e) {
    const star = e.target.closest('.star');
    const { starValue } = star;

    stars.forEach((star, i) => {
      if (e.type === 'click') {
        if (i < starValue) {
          star.classList.add('orange');
        } else {
          star.classList.remove('orange');
        }
        message.textContent = `You rated ${starValue} ${
          starValue <= 1 ? 'star' : 'stars'
        }`;
      } else {
        if (i < starValue && !star.classList.contains('orange')) {
          star.classList.add('yellow');
        } else {
          star.classList.remove('yellow');
        }
      }
    });
  }
})();
