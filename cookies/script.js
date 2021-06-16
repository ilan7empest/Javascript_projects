const inputs = document.querySelectorAll('form[name=cookieForm] input');
const btns = document.querySelectorAll('button.ui');
const output = document.querySelector('#output');

const cookie = {};

btns.forEach((btn) => btn.addEventListener('click', handleCookies));
document.addEventListener('DOMContentLoaded', () => {
  const date = new Date().getTime();
  const weekDate = new Date(date + 1000 * 60 * 60 * 24 * 7);

  inputs.forEach((input) => {
    cookie[input.name] = input.value;
    if (input.type === 'date' && cookie.cookieExpiration === '') {
      cookie.cookieExpiration = weekDate;
      input.defaultValue = weekDate.toISOString().split('T')[0];
    }

    input.addEventListener('input', handleInput);
  });
});

function handleInput(e) {
  cookie[e.target.name] = e.target.value;
}

function handleCookies(e) {
  e.preventDefault();
  const action = e.target.id;
  if (action == 'set') {
    setCookie();
    return;
  }
  if (action == 'get') {
    getCookie();
    return;
  }
  if (action == 'delete') {
    deleteCookie();
    return;
  }
  if (action == 'all') {
    allCookies();
    return;
  }
}

function setCookie() {
  let { cookieName, cookieValue, cookieExpiration } = cookie;
  if (cookieName === '' || cookieValue === '') return;
  cookieExpiration = cookieExpiration === '' ? new Date() : cookieExpiration;
  document.cookie = `${cookieName}=${encodeURIComponent(
    cookieValue
  )};Expires=${new Date(cookieExpiration)};Secure`;
  output.textContent = cookie.cookieName + ' created';
}

function getCookie() {
  const allCookies = decodeURIComponent(document.cookie).split('; ');
  const exisitingCookie = allCookies.find((c) =>
    c.startsWith(cookie.cookieName + '=')
  );

  if (!exisitingCookie) {
    output.textContent =
      'Could not find cookie by the name: ' + cookie.cookieName;
    return;
  }
  output.textContent = 'Found: ' + exisitingCookie;
  return exisitingCookie;
}

function deleteCookie() {
  const ec = getCookie();
  if (ec) {
    document.cookie = `${cookie.cookieName}=;Expires=${new Date(0)}`;
    output.textContent = cookie.cookieName + ' deleted';
  }
}

function allCookies() {
  const allCookies = decodeURIComponent(document.cookie).split('; ');
  output.innerHTML = allCookies.join('<br />');
}
