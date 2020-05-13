const FILM_LIST_EXTRA_QUANTITY = 2;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

import FilmListComponent from "../components/film-list";
import MovieController from "./movie";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmsComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more";
import TopFilmsListComponent from "../components/top-list";
import CommentedFilmsListComponent from "../components/comment-list";
import SortListComponent, {SortType} from "../components/sort";


// Логика сортировки
const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderMovies = (filmsListContainer, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedMovieControllers = [];
    this._extraMovieControllers = [];

    this._sortListComponent = new SortListComponent();
    this._filmListComponent = new FilmListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopFilmsListComponent = new TopFilmsListComponent();
    this._CommentedFilmsListComponent = new CommentedFilmsListComponent();
    this._showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortListComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
  }


  render(films) {
    this._films = films;
    render(this._container, this._sortListComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmListComponent, RenderPosition.BEFOREEND);

    const isFilmDetails = !!films.length;
    if (!isFilmDetails) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Объявление контейнеров для добавление разметки
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    // Добавление карточек в DOM
    const newMovies = renderMovies(filmsListContainer, this._films.slice(1, this._showingMovieCardCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._TopFilmsListComponent, RenderPosition.BEFOREEND);

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._CommentedFilmsListComponent, RenderPosition.BEFOREEND);

    // Объявление контейнеров для добавление разметки
    const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmsListTopRatedContainer = filmsExtraElement[0];
    const filmsListMostCommentedContainer = filmsExtraElement[1];

    // Добавление карточек с высоким рейтингом в DOM
    const topMovie = renderMovies(filmsListTopRatedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(topMovie);
    // Добавление карточек с большим количеством комментарив в DOM
    const commentedMovie = renderMovies(filmsListMostCommentedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY), this._onViewChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(commentedMovie);
  }

  _renderShowMoreButton() {
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    // Добавление кнопки показать еще в DOM
    render(filmsListElement, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);

    // Обработчик события нажатия на кнопку загрузить еще
    this._ShowMoreButtonComponent.setClickHandler(() => {
      // Получает количество карточек отображаемых изначально
      const prevMovieCardCount = this._showingMovieCardCount;

      // Увеличение счетчика отображаемых карточек
      this._showingMovieCardCount = this._showingMovieCardCount + SHOWING_FILM_COUNT_BY_BUTTON;

      // Добавление новых карточек
      const sortedMovies = getSortedFilms(this._films, this._sortListComponent.getSortType(), prevMovieCardCount, this._showingMovieCardCount);
      const newMovies = renderMovies(filmsListContainer, sortedMovies, this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      // Удаление кнопки загрузить еще по условию
      if (this._showingMovieCardCount >= this._films.length) {
        remove(this._ShowMoreButtonComponent);
        this._ShowMoreButtonComponent.removeElement();
      }
    });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }


  // Добавление сортировки
  _onSortTypeChange(sortType) {
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    this._showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

    const sortedMovies = getSortedFilms(this._films, sortType, 1, this._showingMovieCardCount);

    filmsListContainer.innerHTML = ``;
    const newMovies = renderMovies(filmsListContainer, sortedMovies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((film) => film === oldData);

    if (index === -1) {
      return;
    }

    this._films = [...this._films.slice(0, index), newData, ...this._films.slice(index + 1)];
    movieController.render(this._films[index]);
  }
}
