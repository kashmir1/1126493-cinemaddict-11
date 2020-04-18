const MOVIE_CARD_QUANTITY = 15;
const FILM_LIST_EXTRA_QUANTITY = 2;
const FILM_DETAIL_QUANTITY = 1;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const MAX_COMMENTS = 5;

import {createUserRank} from "./components/rank";
import {createNavigation} from "./components/navigation";
import {createFilmsList} from "./components/film-list";
import {createTopList} from "./components/top-list";
import {createCommentList} from "./components/comment-list";
import {createFilmCard} from "./components/film-card";
import {createShowMoreButton} from "./components/show-more";
import {createFilmDetail} from "./components/film-detail";
import {createComments} from "./components/comments";

// Моки
import {generateFilms} from "./mock/film-data";
import {generateComments} from "./mock/comments";
import {generateFilters} from "./mock/filter";

const films = generateFilms(MOVIE_CARD_QUANTITY);
const filmsDetail = generateFilms(MOVIE_CARD_QUANTITY);
const filters = generateFilters();
const comments = generateComments(MAX_COMMENTS);

// Рендер
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Рендерим звание пользователя
const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

render(headerElem, createUserRank(), `beforeend`);
render(mainElem, createNavigation(filters), `beforeend`);

// Выводим контейнер для фильмов
render(mainElem, createFilmsList(), `beforeend`);

// Рендерим карточки
const filmsListContainer = mainElem.querySelector(`.films-list__container`);
let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

films.slice(1, showingFilmCount)
  .forEach((films) => render(filmsListContainer, createFilmCard(films), `beforeend`));


// Рендерим кнопку
const filmsList = mainElem.querySelector(`.films-list`);
render(filmsList, createShowMoreButton(), `beforeend`);

const loadMoreButton = mainElem.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

  films.slice(prevFilmCount, showingFilmCount)
    .forEach((films) => render(filmsListContainer, createFilmCard(films), `beforeend`));

  // Удаляем кнопку
  if (showingFilmCount >= films.length) {
    loadMoreButton.remove();
  }
});

// Топовые и комментируемые фильмы
const filmsContainer = mainElem.querySelector(`.films`);
render(filmsContainer, createTopList(), `beforeend`);
render(filmsContainer, createCommentList(), `beforeend`);

// Заполняем топовые фильмы карточками
const topFilms = filmsContainer.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(topFilms, createFilmCard(films[i]), `beforeend`);
}
//
// Заполняем комментируемые фильмы карточками
const commentFilms = filmsContainer.querySelector(`.films-list--extra:last-child .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(commentFilms, createFilmCard(films[i]), `beforeend`);
}

const aaa = filmsDetail[FILM_DETAIL_QUANTITY];

// Рендерим попап
const siteBody = document.querySelector(`body`);
render(siteBody, createFilmDetail(aaa), `beforeend`);


// Рендерим комментарии
const commentsList = siteBody.querySelector(`.film-details__comments-list`);
for (let i = 0; i < aaa.comments.length; i++) {
  render(commentsList, createComments(aaa.comments[i]), `beforeend`);
}
