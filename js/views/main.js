import icons from 'url:../../img/icons.svg'

export default class Main {
  _data;
  render(data) {
    if (!data) return this.renderError();
    this._data = data;
    const markUp = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderSpinner = function () {
    const markUp = `
        <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
        `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message) {
    const markUp = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
      `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}