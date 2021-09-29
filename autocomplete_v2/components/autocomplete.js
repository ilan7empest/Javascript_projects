import { debounce } from '../helpers.js';
import CustomError from './error.js';

/**
 * Class based component
 * @class Autocomplete
 * @param configObj
 */

class Autocomplete {
  #root = HTMLElement;
  #errorRoot = document.body;
  #inputEl;
  #dropdownMenuEl = HTMLElement;
  #resultsEl = HTMLElement;

  constructor({
    root,
    name,
    title,
    errorRoot,
    onSearch,
    renderOption,
    OnOptionSelect,
    setInputAfterSelect,
    setError,
  }) {
    this.#root = root;
    this.#errorRoot = errorRoot;
    this.name = name;
    this.title = title;
    this.onSearch = onSearch;
    this._renderOptionTemplate = renderOption;
    this._handleOnOptionSelect = OnOptionSelect;
    this._setInputAfterSelect = setInputAfterSelect;
    this._setError = setError;
    this.#render();
    console.log(this);
  }
  #render() {
    this.#root.insertAdjacentHTML(
      'afterbegin',
      `<label for=${this.name}><b>Search For a ${this.title}</b></label>
        <input class="input" id="input-${this.name}" type="search" />
        <div class="dropdown" id="dropdown-${this.name}">
          <div class="dropdown-menu">
            <div class="dropdown-content results" id="results-${this.name}"></div>
          </div>
        </div>`
    );

    this.#inputEl = document.querySelector(`input[id="input-${this.name}"]`);
    this.#dropdownMenuEl = document.querySelector(`#dropdown-${this.name}`);
    this.#resultsEl = document.querySelector(`#results-${this.name}`);

    this.#handleEvents();
  }
  #handleEvents() {
    this.#inputEl.addEventListener(
      'input',
      debounce(this.#handleOnSearch.bind(this))
    );
    this.#inputEl.addEventListener('focus', () => {
      if (this.#resultsEl.childElementCount > 0)
        this.#dropdownMenuEl.classList.add('is-active');
    });
    document.addEventListener('click', (e) => {
      if (!this.#root.contains(e.target)) {
        this.#dropdownMenuEl.classList.remove('is-active');
      }
    });
  }
  async #handleOnSearch(e) {
    const inputValue = e.target.value;
    if (inputValue.trim() === '') {
      this.#resultsEl.innerHTML = '';
      this.#dropdownMenuEl.classList.remove('is-active');
      return;
    }
    try {
      let results = await this.onSearch(inputValue);
      if (!results || results.length == 0) {
        this.#dropdownMenuEl.classList.remove('is-active');
      }

      this.#resultsEl.innerHTML = '';
      for (let result of results) {
        this.#renderOption(result);
      }
      this.#dropdownMenuEl.classList.add('is-active');
    } catch (err) {
      new CustomError(this.#errorRoot, err);
    }
  }

  #renderOption(result) {
    const dropdownItem = document.createElement('a');
    dropdownItem.classList.add('dropdown-item');

    dropdownItem.insertAdjacentHTML(
      'afterbegin',
      this._renderOptionTemplate(result)
    );

    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();
      this.#inputEl.value = this._setInputAfterSelect(result);
      this.#dropdownMenuEl.classList.remove('is-active');
      this._handleOnOptionSelect(result);
    });

    this.#resultsEl.insertAdjacentElement('afterbegin', dropdownItem);
  }
}

export default Autocomplete;
