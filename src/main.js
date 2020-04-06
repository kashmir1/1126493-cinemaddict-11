const MOVIE_CARD_QUANTITY = 5;
const FILM_LIST_EXTRA_QUANTITY = 2;

import {createUserRank} from "./components/rank";
import {createNavigation} from "./components/navigation";
import {createFilmsList} from "./components/film-list";
import {createTopList} from "./components/top-list";
import {createCommentList} from "./components/comment-list";
import {createFilmCard} from "./components/film-card";
import {createShowMoreButton} from "./components/show-more";
import {createFilmDetail} from "./components/film-detail";


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

// Рендерим попап
const siteBody = document.querySelector(`body`);
render(siteBody, createFilmDetail(), `beforeend`);
