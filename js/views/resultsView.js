import Main from './main';
import icons from 'url:../../img/icons.svg'

class ResultsView extends Main {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this.generateMarkupPreview).join('')

  }
  generateMarkupPreview(result) {
    return `
        <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img crossorigin="anonymous" src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
        `;
  }
}

export default new ResultsView;