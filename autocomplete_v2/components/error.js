class CustomError extends Error {
  #root;
  constructor(root, message) {
    super(message);
    this.name = 'CustomError';
    this.#root = root;
    this.#render();
    this.#events();
  }

  #render() {
    this.#root.insertAdjacentHTML('afterbegin', this.template);
    this.modal = document.querySelector('.modal');
    if (this.modal) {
      setTimeout(() => this.modal.classList.add('is-active'), 100);
    }
  }

  #events() {
    document.querySelector('.modal-close').addEventListener('click', () => {
      this.modal.classList.remove('is-active');
      setTimeout(() => this.modal.remove(), 300);
    });
  }

  template = `<div class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <div class="content">
                         ${this.message}
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
             </div>
            `;
}

export default CustomError;
