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
export default class SortList extends AbstractComponent {
  getTemplate() {
    return createSortList();
  }

  getSortType() {

  }

  setSortTypeChangeHandler(handler) {

  }
}
