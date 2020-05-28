const MOVIE_LIST_EXTRA_QUANTITY = 2;
const SHOWING_MOVIE_COUNT_ON_START = 5;
const SHOWING_MOVIE_COUNT_BY_BUTTON = 5;

import MovieListComponent from "../components/movies-list";
import MovieController from "./movie";
import {remove, render, RenderPosition} from "../utils/render";
import NoMoviesComponent from "../components/no-movies";
import ShowMoreButtonComponent from "../components/show-more";
import SortListComponent, {SortType} from "../components/sort";
import ExtraMovieListComponent from './../components/extra-movies';


// Логика сортировки
const getSortedMovies = (movies, sortType) => {
  let sortedMovies = [];

  switch (sortType) {
    case SortType.DATE:
      sortedMovies = [...movies].sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      break;
    case SortType.RATE_DOWN:
      sortedMovies = [...movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
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

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setOnSortTypeChange(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._movieListComponent.hide();
    this._sortingComponent.hide();
  }

  show() {
    this._movieListComponent.show();
    this._sortingComponent.show();
  }

  render() {
    const movies = this._moviesModel.getMovies();
    const container = this._container;
    render(container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(container, this._movieListComponent, RenderPosition.BEFOREEND);

    const movieListElement = this._container.querySelector(`.films-list`);

    if (!movies.length) {
      render(movieListElement, this._noMoviesComponent);
      return;
    }

    this._renderMovies(movies.slice(0, this._showingMoviesCount));
    this._renderShowMoreButton();
    this._renderTopRatedMovies();
    this._renderMostCommentedMovies();
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
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _updateMovie(movie) {
    this._sortedMovies = this._sortedMovies.map((it) => {
      if (it.id === movie.id) {
        return movie;
      }
      return it;
    });
  }

  _renderTopRatedMovies() {
    const moviesElement = this._container.querySelector(`.films`);
    const topRatedMovies = this._moviesModel.getAllMovies()
      .filter((movie) => movie.filmInfo.totalRating)
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, MOVIE_LIST_EXTRA_QUANTITY);

    if (topRatedMovies.length) {
      const extraMovieListComponent = new ExtraMovieListComponent(`Top rated`);
      render(moviesElement, extraMovieListComponent, RenderPosition.BEFOREEND);
      const extraMovies = renderMovies(extraMovieListComponent.getElement().querySelector(`.films-list__container`), topRatedMovies, this._onDataChange, this._onViewChange);
      this._extraMovieControllers = this._extraMovieControllers.concat(extraMovies);
    }
  }

  _renderMostCommentedMovies() {
    const moviesElement = this._container.querySelector(`.films`);

    const mostCommentedTitleElement = [...this._container.querySelectorAll(`.films-list__title`)]
      .find((listTitle) => listTitle.textContent.includes(`Most commented`));

    if (mostCommentedTitleElement) {
      mostCommentedTitleElement.parentElement.remove();
    }

    const mostCommentedMovies = this._moviesModel.getAllMovies()
      .filter((movie) => movie.comments.length)
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, MOVIE_LIST_EXTRA_QUANTITY);

    if (mostCommentedMovies.length) {
      const extraMovieListComponent = new ExtraMovieListComponent(`Most commented`);
      render(moviesElement, extraMovieListComponent, RenderPosition.BEFOREEND);
      const extraMovies = renderMovies(extraMovieListComponent.getElement().querySelector(`.films-list__container`), mostCommentedMovies, this._onDataChange, this._onViewChange);
      this._extraMovieControllers = this._extraMovieControllers.concat(extraMovies);
    }
  }

  _onDataChange(oldData, newData) {
    /* newData === null в случае, когда необходимо удалить комментарий */
    if (newData === null) {
      const {movie, commentId} = oldData;
      const isSuccess = this._moviesModel.removeComment(commentId, movie);

      if (isSuccess) {
        this._updateMovie(newData);

        /* Находит все карточки, которые необходимо обновить */
        this._showedMovieControllers.concat(this._extraMovieControllers)
          .filter(({id}) => id === movie.id)
          .forEach((movieController) => movieController.render(this._moviesModel.getAllMovies().find((it) => it.id === movie.id)));

        this._renderMostCommentedMovies();
      }
      /* oldData === null в случае, когда необходимо добавить комментарий */
    } else if (oldData === null) {
      const {movie, comment} = newData;
      const isSuccess = this._moviesModel.addComment(comment, movie);

      if (isSuccess) {
        /* Находит все карточки, которые необходимо обновить */
        this._showedMovieControllers.concat(this._extraMovieControllers)
          .filter(({id}) => id === movie.id)
          .forEach((movieController) => movieController.render(this._moviesModel.getAllMovies().find((it) => it.id === movie.id)));

        this._renderMostCommentedMovies();
      }
    } else {
      const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

      if (isSuccess) {
        this._updateMovies();
        /* Находит все карточки, которые необходимо обновить */
        this._showedMovieControllers.concat(this._extraMovieControllers)
          .filter(({id}) => id === oldData.id)
          .forEach((movieController) => movieController.render(newData));
      }
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
    this._removeMovies();
    this._renderMovies(this._sortedMovies.slice(0, this._showingMoviesCount));

    remove(this._showMoreButtonComponent);
    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevMoviesCount = this._showingMoviesCount;
    this._showingMoviesCount += SHOWING_MOVIE_COUNT_BY_BUTTON;

    this._renderMovies(this._sortedMovies.slice(prevMoviesCount, this._showingMoviesCount));

    if (this._showingMoviesCount >= this._sortedMovies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateMovies();
  }
}
