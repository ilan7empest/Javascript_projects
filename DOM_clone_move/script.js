window.addEventListener('load', init);

const bin = document.querySelector('#bin');

function init() {
  const parents = document.querySelectorAll('.copyMe');

  parents.forEach((el, idx) => {
    el.style.left = 100 * idx + 'px';
    el.addEventListener('click', () => {
      const child = {};
      child.obj = el.cloneNode(true);
      child.obj.style.cursor = 'move';
      child.obj.classList.add('newEl');
      child.obj.style.backgroundColor = randomHex();
      //   child.obj.style.left = el.offsetLeft + 'px';
      //   child.obj.style.top = el.offsetTop + 200 + 'px';

      child.obj.posY = el.clientHeight;
      child.obj.posX = el.offsetLeft;
      child.obj.moves = Math.floor(Math.random() * 25) + 1;
      child.obj.int = setInterval(mover, 25);

      function mover() {
        if (child.obj.moves <= 0) {
          clearInterval(child.obj.int);
        } else {
          child.obj.moves--;
          child.obj.posY += 10;
          child.obj.style.top = child.obj.posY + 'px';
        }
      }
      document.body.appendChild(child.obj);
      dragger(child.obj);
    });
  });
}

function isColide(el) {
  const elRect = el.getBoundingClientRect();
  const binRect = bin.getBoundingClientRect();
  return !(
    elRect.bottom < binRect.top ||
    elRect.top > binRect.bottom ||
    elRect.right < binRect.left ||
    elRect.left > binRect.right
  );
}

function dragger(el) {
  let pos = {};
  el.addEventListener('mousedown', dragMe);

  function dragMe(e) {
    e = e || window.event;
    e.preventDefault();
    pos.nx = e.clientX;
    pos.ny = e.clientY;

    document.onmouseup = stopDrag;
    document.onmousemove = dragEl;
  }

  function dragEl(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos.x = pos.nx - e.clientX;
    pos.y = pos.ny - e.clientY;
    pos.nx = e.clientX;
    pos.ny = e.clientY;
    // set the element's new position:
    el.style.top = el.offsetTop - pos.y + 'px';
    el.style.left = el.offsetLeft - pos.x + 'px';

    if (isColide(el)) {
      el.onmousedown = null;
      el.parentElement.removeChild(el);
    }
  }

  function stopDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function randomHex() {
  let hex = '#';
  let num = 0;
  while (num < 3) {
    hex += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
    num++;
  }
  return hex;
}
