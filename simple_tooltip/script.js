(function () {
  const tooltipLinks = document.querySelectorAll('.tooltip');
  const tooltipEl = createTooltip();
  let interval;

  function createTooltip() {
    const ttEl = document.createElement('span');
    ttEl.classList.add('output');
    document.body.appendChild(ttEl);
    return ttEl;
  }

  tooltipLinks.forEach((tooltipLink) => {
    tooltipLink.addEventListener('mouseover', showTooltip);
    tooltipLink.addEventListener('mouseout', hideTooltip);
    tooltipLink.addEventListener('mousemove', moveTooltip);
  });

  function showTooltip(e) {
    const { tooltipcontent } = e.target.dataset;
    tooltipEl.textContent = tooltipcontent;
  }
  function hideTooltip() {
    tooltipEl.style = '';
    tooltipEl.textContent = '';
  }
  function moveTooltip(e) {
    clearInterval(interval);
    const posX = e.clientX;
    const posY = e.clientY;
    tooltipEl.style = `display: block;left: ${posX}px;top: ${posY + 10}px`;
    interval = setInterval(() => {
      tooltipEl.style = '';
    }, 2000);
  }
})();
