function ImgPlacholder() {
  const BASE_URL = 'https://via.placeholder.com';

  let image = {};

  const sizeSelecor = document.querySelector('#imgSize');
  const inputs = document.querySelectorAll('input');
  const imgPreview = document.querySelector('#previewImg');
  const output = document.querySelector('#output');

  sizeSelecor.addEventListener('change', render);
  inputs.forEach((input) => input.addEventListener('change', render));

  function render(e) {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case 'imgSize':
        image.size = value !== 'custom' ? value : getCustomSize();
        break;
      case 'imgText':
        image.text = value.split(' ').join('+');
        break;
      case 'imgBgColor':
        image.bgcolor = value.substring(1);
        break;
      case 'imgTextColor':
        image.tcolor = value.substring(1);
        break;
      default:
        return;
    }
    let link = `${BASE_URL}/${image.size || '150x50'}/${image.bgcolor || ''}/${
      image.tcolor || ''
    }?text=${image.text || ''}`;
    imgPreview.src = link;
    output.textContent = link;
    output.select();
    output.focus();
    document.execCommand('copy');
  }
}

document.addEventListener('DOMContentLoaded', ImgPlacholder);
