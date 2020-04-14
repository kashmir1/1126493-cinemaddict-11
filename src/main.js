const MOVIE_CARD_QUANTITY = 15;
const FILM_LIST_EXTRA_QUANTITY = 2;
const FILM_DETAIL_QUANTITY = 1;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const MAX_COMMENTS = 5;
const MIN_COMMENT_VALUE = 1;
const MAX_COMMENT_VALUE = 5;

import {randomInt} from "./utils";

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

const film = generateFilms(MOVIE_CARD_QUANTITY);
const comment = generateComments(MAX_COMMENTS);
const filters = generateFilters();

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

film.slice(1, showingFilmCount)
  .forEach((film) => render(filmsListContainer, createFilmCard(film), `beforeend`));


// Рендерим кнопку
const filmsList = mainElem.querySelector(`.films-list`);
render(filmsList, createShowMoreButton(), `beforeend`);

const loadMoreButton = mainElem.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

  film.slice(prevFilmCount, showingFilmCount)
    .forEach((film) => render(filmsListContainer, createFilmCard(film), `beforeend`));

  // Удаляем кнопку
  if (showingFilmCount >= film.length) {
    loadMoreButton.remove();
  }
});

// Топовые и комментируемые фильмы
const films = mainElem.querySelector(`.films`);
render(films, createTopList(), `beforeend`);
render(films, createCommentList(), `beforeend`);

// Заполняем топовые фильмы карточками
const topFilms = films.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(topFilms, createFilmCard(film[i]), `beforeend`);
}
//
// Заполняем комментируемые фильмы карточками
const commentFilms = films.querySelector(`.films-list--extra:last-child .films-list__container`);
for (let i = 0; i < FILM_LIST_EXTRA_QUANTITY; i++) {
  render(commentFilms, createFilmCard(film[i]), `beforeend`);
}

// Рендерим попап
const siteBody = document.querySelector(`body`);
render(siteBody, createFilmDetail(film[FILM_DETAIL_QUANTITY]), `beforeend`);

// Рендерим комментарии
const commentsList = siteBody.querySelector(`.film-details__comments-list`);
for (let i = 0; i < randomInt(MIN_COMMENT_VALUE, MAX_COMMENT_VALUE); i++) {
  render(commentsList, createComments(comment[i]), `beforeend`);
}
