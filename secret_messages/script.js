(function () {
  const meassageCard = document.querySelector('#secret');
  const encryptedLinkCard = document.querySelector('#encryptedLink');
  const decryptedLinkCard = document.querySelector('#decryptedLink');
  const form = document.querySelector('form');
  const input = document.querySelector('#secretInput');
  const linkEl = document.querySelector('#shareLink');

  let encryptedMessage = '';
  let decryptedMessage = '';

  //   input.addEventListener('input', (e) => {
  //     const message = e.target.value;
  //   });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    encryptedMessage = btoa(input.value);
    linkEl.value = `${window.location}#${encryptedMessage}`;
    input.value = '';

    meassageCard.classList.add('hide');
    encryptedLinkCard.classList.remove('hide');
    linkEl.select();
    console.log();
  });

  window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      decryptedMessage = atob(hash);

      encryptedLinkCard.classList.add('hide');
      meassageCard.classList.add('hide');

      decryptedLinkCard.insertAdjacentHTML(
        'afterbegin',
        `<h1>${decryptedMessage}</h1>`
      );
      decryptedLinkCard.classList.remove('hide');
    }
  });
})();
