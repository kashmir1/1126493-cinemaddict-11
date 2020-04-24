import {createElement} from "../utils";

const createFooterStatistics = (filmsCount) => {

  const statisticsTitle = filmsCount !== 0 ? `${filmsCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
    <p>${statisticsTitle}</p>
  </section>`
  );
};

export default class SiteFooterStatisctics {
  constructor(FILMS_COUNT) {
    this._filmsCount = FILMS_COUNT;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
