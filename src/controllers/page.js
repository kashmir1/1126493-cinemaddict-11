const MOVIE_LIST_EXTRA_QUANTITY = 2;
const SHOWING_MOVIE_COUNT_ON_START = 6;
const SHOWING_MOVIE_COUNT_BY_BUTTON = 5;

import MovieListComponent from "../components/movies-list";
import MovieController from "./movie";
import {remove, render, RenderPosition} from "../utils/render";
import NoMoviesComponent from "../components/no-movies";
import ShowMoreButtonComponent from "../components/show-more";
import TopMoviesListComponent from "../components/top-list";
import CommentedMoviesListComponent from "../components/comment-list";
import SortListComponent, {SortType} from "../components/sort";


// Логика сортировки
const getSortedMovies = (movies, sortType, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedMovies = showingMovies.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATE_DOWN:
      sortedMovies = showingMovies.sort((a, b) => b.rate - a.rate);
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies.slice(from, to);
};

const renderMovies = (moviesListContainer, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(moviesListContainer, onDataChange, onViewChange);
    movieController.render(movie);
    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._movies = [];
    this._sortedMovies = [];
    this._showedMovieControllers = [];

    this._sortListComponent = new SortListComponent();
    this._movieListComponent = new MovieListComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopMoviesListComponent = new TopMoviesListComponent();
    this._CommentedMoviesListComponent = new CommentedMoviesListComponent();
    this._showingMovieCardCount = SHOWING_MOVIE_COUNT_ON_START;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortListComponent.setOnSortTypeChange(this._onSortTypeChange);


    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }


  render(movies) {
    this._movies = movies;
    this._sortedMovies = movies;
    render(this._container, this._sortListComponent, RenderPosition.BEFOREEND);
    render(this._container, this._movieListComponent, RenderPosition.BEFOREEND);

    const isMovie = !!movies.length;
    if (!isMovie) {
      render(this._container, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Объявление контейнеров для добавление разметки
    const moviesElement = this._container.querySelector(`.films`);
    const moviesListElement = moviesElement.querySelector(`.films-list`);
    const moviesListContainer = moviesListElement.querySelector(`.films-list__container`);

    // Добавление карточек в DOM
    const newMovies = renderMovies(moviesListContainer, this._sortedMovies.slice(1, this._showingMovieCardCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();

    // Добавление шаблона с дополнительными фильмами в DOM
    render(moviesElement, this._TopMoviesListComponent, RenderPosition.BEFOREEND);

    // Добавление шаблона с дополнительными фильмами в DOM
    render(moviesElement, this._CommentedMoviesListComponent, RenderPosition.BEFOREEND);

    // Объявление контейнеров для добавление разметки
    const moviesExtraElement = moviesElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const moviesListTopRatedContainer = moviesExtraElement[0];
    const moviesListMostCommentedContainer = moviesExtraElement[1];

    // Добавление карточек с высоким рейтингом в DOM
    const topMovie = renderMovies(moviesListTopRatedContainer, movies.slice(0, MOVIE_LIST_EXTRA_QUANTITY), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(topMovie);
    // Добавление карточек с большим количеством комментарив в DOM
    const commentedMovie = renderMovies(moviesListMostCommentedContainer, movies.slice(0, MOVIE_LIST_EXTRA_QUANTITY), this._onViewChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(commentedMovie);
  }

  _renderShowMoreButton() {
    const moviesElement = this._container.querySelector(`.films`);
    const moviesListElement = moviesElement.querySelector(`.films-list`);
    const moviesListContainer = moviesListElement.querySelector(`.films-list__container`);

    // Добавление кнопки показать еще в DOM
    render(moviesListElement, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);

    // Обработчик события нажатия на кнопку загрузить еще
    this._ShowMoreButtonComponent.setClickHandler(() => {
      // Получает количество карточек отображаемых изначально
      const prevMovieCardCount = this._showingMovieCardCount;

      // Увеличение счетчика отображаемых карточек
      this._showingMovieCardCount = this._showingMovieCardCount + SHOWING_MOVIE_COUNT_BY_BUTTON;

      // Добавление новых карточек
      const sortedMovies = getSortedMovies(this._movies, this._sortListComponent.getSortType(), prevMovieCardCount, this._showingMovieCardCount);
      const newMovies = renderMovies(moviesListContainer, sortedMovies, this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      // Удаление кнопки загрузить еще по условию
      if (this._showingMovieCardCount >= this._movies.length) {
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
    const moviesElement = this._container.querySelector(`.films`);
    const moviesListElement = moviesElement.querySelector(`.films-list`);
    const moviesListContainer = moviesListElement.querySelector(`.films-list__container`);

    this._showingMovieCardCount = SHOWING_MOVIE_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType, 1, this._showingMovieCardCount);

    moviesListContainer.innerHTML = ``;
    const newMovies = renderMovies(moviesListContainer, sortedMovies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((movie) => movie === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [...this._movies.slice(0, index), newData, ...this._movies.slice(index + 1)];
    movieController.render(this._movies[index]);
  }
}
