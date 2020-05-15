import AbstractComponent from "./abstract-component";

const createFooterStatistics = (moviesCount) => {

  const statisticsTitle = moviesCount !== 0 ? `${moviesCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
    <p>${statisticsTitle}</p>
  </section>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(moviesCount) {
    super();

    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return createFooterStatistics(this._moviesCount);
  }
}
