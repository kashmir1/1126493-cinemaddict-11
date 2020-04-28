import AbstractComponent from "./abstract-component";

const createSortList = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

// Класс сортировка
export default class SortList extends AbstractComponent {
  getTemplate() {
    return createSortList();
  }
}
