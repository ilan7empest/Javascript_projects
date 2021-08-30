class View {
  _data;
  render(data) {
    this._data = data;
    this.template = this._generateMarkup();
    this._parentEl.innerHTML = '';
    if (typeof this.template === 'string') {
      this._parentEl.insertAdjacentHTML('afterbegin', this.template);
    } else {
      this._parentEl.appendChild(this.template);
    }
  }
}

export default View;
