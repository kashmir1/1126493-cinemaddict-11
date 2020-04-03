"use strict";

const MOVIE_CARD_QUANTITY = 5;
const FILM_LIST_EXTRA_QUANTITY = 2;

const createUserRank = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createNavigation = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
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

const createAllFilmsContainer = () => {
  return (
    `<section class="films">
    </section>`
  );
};

const createFilmList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

const createFilmListContainer = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

const createFilmListExtra = () => {
  return (
    `<section class="films-list--extra"></section>`
  );
};

const createFilmCard = () => {
  return (
    ` <article class="film-card">
          <h3 class="film-card__title">The Dance of Life</h3>
          <p class="film-card__rating">8.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

const createFilmListTitle = () => {
  return (
    `<h2 class="films-list__title">Top rated</h2>`
  );
};

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

render(headerElem, createUserRank(), `beforeend`);
render(mainElem, createNavigation(), `beforeend`);
render(mainElem, createAllFilmsContainer(), `beforeend`);


const filmsElem = mainElem.querySelector(`.films`);
render(filmsElem, createFilmList(), `beforeend`);

const filmsListElem = filmsElem.querySelector(`.films-list`);
render(filmsListElem, createFilmListContainer(), `beforeend`);

const filmListContainerElem = filmsListElem.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_CARD_QUANTITY; i++) {
  render(filmListContainerElem, createFilmCard(), `beforeend`);
}
render(filmsListElem, createShowMoreButton(), `beforeend`);

for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(filmsElem, createFilmListExtra(), `beforeend`);
}

// Рендерим топ
const filmsTopElem = filmsElem.querySelector(`.films-list--extra`);

render(filmsTopElem, createFilmListTitle(), `beforeend`);
render(filmsTopElem, createFilmListContainer(), `beforeend`);

const filmListExtraContainerElem = filmsTopElem.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  render(filmListExtraContainerElem, createFilmCard(), `beforeend`);
}

// рендерим комменты
const filmsCommentElem = filmsElem.querySelector(`.films-list--extra:last-child`);

render(filmsCommentElem, createFilmListTitle(), `beforeend`);
render(filmsCommentElem, createFilmListContainer(), `beforeend`);

const filmListTopContainerElem = filmsCommentElem.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  render(filmListTopContainerElem, createFilmCard(), `beforeend`);
}
