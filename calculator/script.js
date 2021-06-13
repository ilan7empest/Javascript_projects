class Calc {
  #parent = document.querySelector('.myCalc');
  #myKeys = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['C', '0', '=', '/'],
  ];
  #myOpr = ['+', '-', '*', '/'];
  constructor() {
    this.output = this.#buildOutput();
    this.#buildButtons();
  }

  #buildOutput() {
    const output = document.createElement('div');
    output.classList.add('output');
    output.textContent = '0';
    this.#parent.insertAdjacentElement('afterbegin', output);
    return output;
  }
  #buildButtons() {
    for (let r = 0; r < this.#myKeys.length; r++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let b = 0; b < this.#myKeys[r].length; b++) {
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.textContent = this.#myKeys[r][b];
        btn.dataset.key = this.#myKeys[r][b];
        btn.addEventListener('click', this._handleBtn.bind(this));
        row.appendChild(btn);
      }
      this.#parent.appendChild(row);
    }
  }
  _handleBtn(e) {
    e.preventDefault();
    const key = e.target.dataset.key;
    let output = this.output.textContent;
    const lastChar = output.substring(output.length - 1);
    if (output == '0') {
      output = '';
    }
    switch (key) {
      case 'C':
        this.output.textContent = '0';
        break;
      case '=':
        if (this.#myOpr.includes(lastChar)) return;
        output = eval(output);
        this.output.textContent = output;
        break;
      case this.#myOpr.includes(key) && key:
        if (this.#myOpr.includes(lastChar)) {
          output = output.substring(0, output.length - 1);
        } else {
          output = eval(output);
        }
      default:
        this.output.textContent = output + key;
    }
  }
}

document.addEventListener('DOMContentLoaded', new Calc());
