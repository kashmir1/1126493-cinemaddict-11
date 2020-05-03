import AbstractComponent from "./abstract-component";

const createFilterMarkup = (name, count, url) => {

  return (
    `
     <a href="#${url}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
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
}
