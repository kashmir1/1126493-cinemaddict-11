const MOVIE_LIST_EXTRA_QUANTITY = 2;
const SHOWING_MOVIE_COUNT_ON_START = 5;
const SHOWING_MOVIE_COUNT_BY_BUTTON = 5;

import MovieListComponent from "../components/movies-list";
import MovieController from "./movie";
import {remove, render, RenderPosition} from "../utils/render";
import NoMoviesComponent from "../components/no-movies";
import ShowMoreButtonComponent from "../components/show-more";
import TopMoviesListComponent from "../components/top-list";
import CommentedMoviesListComponent from "../components/comment-list";
import SortListComponent, {SortType} from "../components/sort";
import ExtraMovieListComponent from './../components/extra-movies';


// Логика сортировки
const getSortedMovies = (movies, sortType) => {
  let sortedMovies = [];

  switch (sortType) {
    case SortType.DATE:
      sortedMovies = [...movies].sort((a, b) => b.year - a.year);
      break;
    case SortType.RATE_DOWN:
      sortedMovies = [...movies].sort((a, b) => b.rate - a.rate);
      break;
    default:
      sortedMovies = [...movies];
  }

  return sortedMovies;
};

const renderMovies = (movieListElement, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(movieListElement, onDataChange, onViewChange);

    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];
    /* Сохраняет контроллеры фильмов из дополнительных блоков отдельно, чтобы при сортировки и сбросе _showedMovieControllers они не удалялись */
    this._extraMovieControllers = [];
    this._showingMoviesCount = SHOWING_MOVIE_COUNT_ON_START;
    this._sortingComponent = new SortListComponent();
    this._movieListComponent = new MovieListComponent();
    this._sortType = SortType.DEFAULT;
    this._sortedMovies = this._moviesModel.getMovies();
    this._noMoviesComponent = new NoMoviesComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopMoviesListComponent = new TopMoviesListComponent();
    this._CommentedMoviesListComponent = new CommentedMoviesListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setOnSortTypeChange(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }


  render() {
    const movies = this._moviesModel.getMovies();
    render(this._container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(this._container, this._movieListComponent, RenderPosition.BEFOREEND);

    const moviesElement = this._container.querySelector(`.films`);
    const movieListElement = this._container.querySelector(`.films-list`);

    if (!movies.length) {
      render(movieListElement, this._noMoviesComponent);
      return;
    }

    this._renderMovies(movies.slice(0, this._showingMoviesCount));

    this._renderShowMoreButton();

    const topRatedMovies = movies.filter((movie) => movie.rate).sort((a, b) => b.rate - a.rate).slice(0, MOVIE_LIST_EXTRA_QUANTITY);
    const mostCommentedMovies = movies.filter((movie) => movie.comments.length).sort((a, b) => b.comments.length - a.comments.length).slice(0, MOVIE_LIST_EXTRA_QUANTITY);

    if (topRatedMovies.length) {
      const extraMovieListComponent = new ExtraMovieListComponent(`Top rated`);
      render(moviesElement, extraMovieListComponent, RenderPosition.BEFOREEND);
      const extraMovies = renderMovies(extraMovieListComponent.getElement().querySelector(`.films-list__container`), topRatedMovies, this._onDataChange, this._onViewChange);
      this._extraMovieControllers = this._extraMovieControllers.concat(extraMovies);
    }

    if (mostCommentedMovies.length) {
      const extraMovieListComponent = new ExtraMovieListComponent(`Most commented`);
      render(moviesElement, extraMovieListComponent, RenderPosition.BEFOREEND);
      const extraMovies = renderMovies(extraMovieListComponent.getElement().querySelector(`.films-list__container`), mostCommentedMovies, this._onDataChange, this._onViewChange);
      this._extraMovieControllers = this._extraMovieControllers.concat(extraMovies);
    }
  }

  _renderMovies(movies) {
    const movieListElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);

    const newMovies = renderMovies(movieListElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _updateMovies() {
    this._removeMovies();
    this._sortedMovies = getSortedMovies(this._moviesModel.getMovies(), this._sortType);
    this._renderMovies(this._sortedMovies.slice(0, SHOWING_MOVIE_COUNT_ON_START));
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= this._sortedMovies.length) {
      return;
    }
    const moviesElement = this._container.querySelector(`.films`);
    const movieListElement = moviesElement.querySelector(`.films-list`);
    render(movieListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);


    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      const majorMovieListElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);
      this._showingMoviesCount += SHOWING_MOVIE_COUNT_BY_BUTTON;

      const newMovies = renderMovies(majorMovieListElement, this._sortedMovies.slice(prevMoviesCount, this._showingMoviesCount), this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showingMoviesCount >= this._sortedMovies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      /* Находит все карточки, которые необходимо обновить */
      this._showedMovieControllers.concat(this._extraMovieControllers)
        .filter(({id}) => id === oldData.id)
        .forEach((movieController) => movieController.render(newData));
    }
  }

  _onViewChange() {
    this._showedMovieControllers.concat(this._extraMovieControllers)
      .forEach((it) => it.setDefaultView());
  }


  // Добавление сортировки
  _onSortTypeChange(sortType) {
    this._sortType = sortType;
    this._showingMoviesCount = SHOWING_MOVIE_COUNT_ON_START;

    this._sortedMovies = getSortedMovies(this._moviesModel.getMovies(), this._sortType);
    const majorMovieListElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);

    majorMovieListElement.innerHTML = ``;

    const newMovies = renderMovies(majorMovieListElement, this._sortedMovies.slice(0, this._showingMoviesCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newMovies;

    remove(this._showMoreButtonComponent);
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateMovies();
  }
}
