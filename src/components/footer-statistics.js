import AbstractComponent from "./abstract-component";

const createFooterStatistics = (filmsCount) => {

  const statisticsTitle = filmsCount !== 0 ? `${filmsCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
    <p>${statisticsTitle}</p>
  </section>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }
}
