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
  );z
};

// Класс сортировка
export default class SortList extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortList();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      // Проверяем что тег - это тег А, если нет, прерываем выполненеи функции
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      // Если текущий тип сортировки равен той, что пришла в обработчике клика, то ничего не происходит
      if (this._currenSortType === sortType) {
        return;
      }

      // Если условие выше не выполнено, то записываем его в свойства класса _currentSortType и передаем в handler
      this._currenSortType = sortType;

      handler(this._currenSortType);
    });

  }
}
