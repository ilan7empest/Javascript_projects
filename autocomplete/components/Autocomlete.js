import { bounce } from '../utils.js';
class Autocomplete {
  #root;
  #input;
  #dropdown;
  #dropdownMenu;
  #renderOptionsTemplate;
  #afterSelectionInputValue;
  #handleOptionSelect;
  constructor({
    root,
    name,
    title,
    onSearch,
    renderOptions,
    afterSelectionInputValue,
    onOptionSelect,
  }) {
    this.#root = root;
    this.name = name;
    this.title = title;
    this.onSearch = onSearch;
    this.#renderOptionsTemplate = renderOptions;
    this.#afterSelectionInputValue = afterSelectionInputValue;
    this.#handleOptionSelect = onOptionSelect;
    this.#render();
  }

  #render() {
    const template = this.#root.insertAdjacentHTML(
      'afterbegin',
      `<label for=${this.name}><b>Search For a ${this.title}</b></label>
        <input class="input" id=${this.name} type="search" />
        <div class="dropdown">
          <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
          </div>
        </div>`
    );

    this.#input = this.#root.querySelector('input.input');
    this.#dropdown = this.#root.querySelector('.dropdown');
    this.#dropdownMenu = this.#root.querySelector('.dropdown-content');

    this.#events();

    return template;
  }

  #events() {
    window.addEventListener('click', (e) => {
      if (!this.#root.contains(e.target)) {
        this.#dropdown.classList.remove('is-active');
      }
    });

    this.#input.addEventListener(
      'input',
      bounce(this.#handleOnSearch.bind(this))
    );

    this.#input.addEventListener('focus', () => {
      if (this.#dropdownMenu.childNodes.length) {
        this.#dropdown.classList.add('is-active');
      }
    });
  }

  async #handleOnSearch(e) {
    try {
      const results = await this.onSearch(e.target.value);
      if (!results || results.length <= 0) {
        this.#dropdown.classList.remove('is-active');
      }

      this.#dropdownMenu.innerHTML = '';
      for (let result of results) {
        this.#renderOption(result);
      }
      this.#dropdown.classList.add('is-active');
    } catch (err) {
      console.log(err);
    }
  }

  #renderOption(result) {
    const dropdownItem = document.createElement('a');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.insertAdjacentHTML(
      'afterbegin',
      this.#renderOptionsTemplate(result)
    );

    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();
      this.#input.value = this.#afterSelectionInputValue(result);
      this.#dropdown.classList.remove('is-active');
      this.#handleOptionSelect(result);
    });

    this.#dropdownMenu.insertAdjacentElement('beforeend', dropdownItem);
  }
}

export default Autocomplete;
