const inputEl = document.querySelector('textarea[name=inputText]');
const outputEl = document.querySelector('textarea[name=outputText]');
const moveBtn = document.querySelector('#moveBtn');
const copyBtn = document.querySelector('#copyBtn');
const message = document.querySelector('#message');

moveBtn.addEventListener('click', movetext);
copyBtn.addEventListener('click', copyText);

[inputEl, outputEl].forEach((el) => el.addEventListener('click', selectAll));

function movetext() {
  const rawText = inputEl.value;
  outputEl.value = rawText;
}
function copyText() {
  const rawText = inputEl.value;
  copyTextToClipboard(rawText);
}

function copyTextToClipboard(str) {
  inputEl.value = str;
  inputEl.select();
  inputEl.focus();
  document.execCommand('copy');

  message.textContent = `Copied to clipborad: ${str}`;
}

function selectAll() {
  this.select();
}
