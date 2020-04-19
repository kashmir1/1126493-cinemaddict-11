export const createFilterMarkup = (name, count) => {

  return (
    `
     <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
    `
  );
};

export const createNavigation = (filters) => {

  const filtersMarkup = filters.map((it) => createFilterMarkup(it.name, it.count)).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};
