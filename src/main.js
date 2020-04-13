const MOVIE_CARD_QUANTITY = 15;
const FILM_LIST_EXTRA_QUANTITY = 2;
const FILM_DETAIL_QUANTITY = 1;

import {randomInt} from "./utils";

import {createUserRank} from "./components/rank";
import {createNavigation} from "./components/navigation";
import {createFilmsList} from "./components/film-list";
import {createTopList} from "./components/top-list";
import {createCommentList} from "./components/comment-list";
import {createFilmCard} from "./components/film-card";
import {createShowMoreButton} from "./components/show-more";
import {generateFilms} from "./mock/film-data";
// import {createFilmDetail} from "./components/film-detail";
import {createComments} from "./components/comments";
import {generateComments} from "./mock/comments";

const film = generateFilms(MOVIE_CARD_QUANTITY);
const comment = generateComments(3);

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
for (let i = 0; i < film.length; i++) {
  render(filmsListContainer, createFilmCard(film[i]), `beforeend`); // Обращаемся к объекту
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
for (let i = 0; i < randomInt(1, 5); i++) {
  render(commentsList, createComments(comment[i]), `beforeend`);
}
