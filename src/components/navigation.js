import AbstractComponent from "./abstract-component";

const MAIN_FILTER = `All movies`;
const getFilterName = (element) => element.innerText.replace(/[0-9]/g, ``);

const createFilterMarkup = (name, count, url, checked) => {
  const isMainFilter = name === MAIN_FILTER;
  return (
    `
     <a href="#${url}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">
     ${name} ${isMainFilter ? `` : `<span class="main-navigation__item-count">${count}</span>`}
     </a>
    `
  );
};

const createNavigation = (filters) => {

  const filtersMarkup = filters.map((it) => createFilterMarkup(it.name, it.count, it.url)).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

// Класс меню
export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createNavigation(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const target = evt.target;
        const tag = target.tagName;

        /* Проверка на наличие класса нужна для того, чтобы фильтрация не выполнялась при клике на уже активный фильтр */
        if ((tag !== `A` && tag !== `SPAN`) || (target.classList.contains(`main-navigation__item--active`) || target.parentElement.classList.contains(`main-navigation__item--active`))) {
          return;
        }

        const filterName = tag === `A` ? getFilterName(target) : getFilterName(target.parentElement);

        this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);

        if (tag === `A`) {
          target.classList.add(`main-navigation__item--active`);
        } else {
          target.parentElement.classList.add(`main-navigation__item--active`);
        }

        handler(filterName);
      });
  }
}
