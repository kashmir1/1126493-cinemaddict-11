import AbstractComponent from "./abstract-component";

export const SortType = {
  DATE_DOWN: `date-down`,
  RATE_DOWN: `rate-down`,
  DEFAULT: `default`,
};

const createSortList = () => {
  return (
    `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATE_DOWN}" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

// Класс сортировка
export default class Sorting extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createSortList();
  }

  setOnSortTypeChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      handler(this._currentSortType);
    });
  }
}

