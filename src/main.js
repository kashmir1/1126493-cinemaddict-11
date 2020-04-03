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

const createFilmsList = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
    </section>`
  );
};

const createTopList = () => {
  return (
    ` <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
       </section>`
  );
};

const createCommentList = () => {
  return (
    ` <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
       </section>`
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

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Рендерим звание пользователя
const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

render(headerElem, createUserRank(), `beforeend`);
render(mainElem, createNavigation(), `beforeend`);

// Выводим контейнер для фильмов
render(mainElem, createFilmsList(), `beforeend`);

// Рендерим карточки
const filmsListContainer = mainElem.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_CARD_QUANTITY; i++) {
  render(filmsListContainer, createFilmCard(), `beforeend`);
}

// Рендерим кнопку
const filmsList = mainElem.querySelector(`.films-list`);
render(filmsList, createShowMoreButton(), `beforeend`);

// Топовые и комментируемые фильмы
const films = mainElem.querySelector(`.films`);
render(films, createTopList(), `beforeend`);
render(films, createCommentList(), `beforeend`);

// Заполняем топовые фильмы карточками
const topFilms = films.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(topFilms, createFilmCard(), `beforeend`);
}

// Заполняем комментируемые фильмы карточками
const commentFilms = films.querySelector(`.films-list--extra:last-child .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(commentFilms, createFilmCard(), `beforeend`);
}

