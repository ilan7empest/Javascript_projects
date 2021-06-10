const Names = ['Ilan', 'Danny', 'Alex', 'Veta'];

function createImg(text) {
  const img = document.createElement('img');
  img.src = `https://via.placeholder.com/150/${rndColor()}/${rndColor()}?text=${text}`;
  img.setAttribute('style', 'width:150px;height:150px');
  img.addEventListener('click', handlePopup);
  return img;
}

function createPopup(imgURL) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.addEventListener('click', closePopup);

  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal-warpper');

  const closeBtn = document.createElement('span');
  closeBtn.textContent = 'X';
  closeBtn.setAttribute('class', 'modal_close_btn');
  closeBtn.addEventListener('click', closePopup);

  const imgPlaceholder = document.createElement('div');
  imgPlaceholder.classList.add('modal_img_placeholder');

  const img = document.createElement('img');
  img.src = imgURL;
  imgPlaceholder.appendChild(img);

  document.body.appendChild(overlay);
  modal.insertAdjacentElement('afterbegin', imgPlaceholder);
  modal.insertAdjacentElement('afterbegin', closeBtn);

  return modal;
}

function handlePopup(e) {
  const { src } = e.target;
  const newImgLink = src.replace('150', '300');
  document.body.appendChild(createPopup(newImgLink));
}

function closePopup() {
  const popup = document.querySelector('.modal-warpper');
  const overlay = document.querySelector('.overlay');
  if (popup) popup.remove();
  if (overlay) overlay.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < Names.length; i++) {
    const img = createImg(Names[i]);
    document.body.appendChild(img);
  }
});

function rndColor() {
  const hex = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
  return hex() + hex() + hex();
}
