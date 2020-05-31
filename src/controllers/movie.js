import MovieCardComponent from "../components/movie-card";
import MovieDetailComponent from "../components/movie-detail";
import MovieModel from './../models/movie.js';
import {render, remove, replace} from "../utils/render";

const SHAKE_ANIMATION_TIMEOUT = 600;
const SECOND = 1000;
const COMMENT_ELEMENT = `TEXTAREA`;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this.id = null;
    this._container = container;
    this._mode = Mode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;


    this._movieCardComponent = null;
    this._movieDetailsComponent = null;
    this._n

    this._removeMovieDetailsComponent = this._removeMovieDetailsComponent.bind(this);
    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._handlePopupKeydown = this._handlePopupKeydown.bind(this);
    this._onAddNewComment = this._onAddNewComment.bind(this);
  }

  render(movie) {
    this.id = movie.id;
    /* Сохраняют состояния компонентов */
    const oldMovieCardComponent = this._movieCardComponent;
    const oldMovieDetailsComponent = this._movieDetailsComponent;

    this._movieCardComponent = new MovieCardComponent(movie);
    this._movieDetailsComponent = new MovieDetailComponent(movie);

    this._subscribeOnCardEvents(movie);

    if (oldMovieCardComponent && oldMovieDetailsComponent) {
      replace(oldMovieCardComponent, this._movieCardComponent);
      replace(oldMovieDetailsComponent, this._movieDetailsComponent);
      this._subscribeOnPopupEvents(movie);
    } else {
      render(this._container, this._movieCardComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeMovieDetailsComponent();
    }
  }

  destroy() {
    remove(this._movieCardComponent);
    document.removeEventListener(`keydown`, this._onAddNewComment);
  }

  shake() {
    this._movieCardComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SECOND}s`;
    this._movieDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SECOND}s`;

    setTimeout(() => {
      this._movieCardComponent.getElement().style.animation = ``;
      this._movieDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _removeMovieDetailsComponent() {
    remove(this._movieDetailsComponent);
    document.removeEventListener(`keydown`, this._handlePopupKeydown);
    document.removeEventListener(`keydown`, this._onAddNewComment);
    this._mode = Mode.DEFAULT;
  }

  _onPopupCloseButtonClick(evt) {
    evt.preventDefault();
    this._removeMovieDetailsComponent();
  }

  _handlePopupKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeMovieDetailsComponent();
    }
  }

  _subscribeOnCardEvents(movie) {
    /* Добавляет обработчик клика, вызывающий показ попапа с подробной информацией о фильме */
    this._movieCardComponent.setOnDetailsOpenersClick(() => {
      this._onViewChange();
      render(document.body, this._movieDetailsComponent);
      this._subscribeOnPopupEvents(movie);
      document.addEventListener(`keydown`, this._handlePopupKeydown);
      document.addEventListener(`keydown`, this._onAddNewComment);
      this._mode = Mode.DETAILS;
    });

    this._movieCardComponent.setOnAddToWatchlistButtonClick((evt) => {
      evt.preventDefault();
      this._onWatchlistChange(movie);
    });

    this._movieCardComponent.setOnAlreadyWatchedButtonClick((evt) => {
      evt.preventDefault();
      this._onAlreadyWatchedChange(movie);
    });

    this._movieCardComponent.setOnFavoriteButtonClick((evt) => {
      evt.preventDefault();
      this._onFavoritesChange(movie);
    });
  }

  _subscribeOnPopupEvents(movie) {
    this._movieDetailsComponent.setPopupCloseButtonClick(this._removeMovieDetailsComponent);
    this._movieCardComponent.setPopupKeydown(this._handlePopupKeydown);

    this._movieDetailsComponent.setOnAddToWatchlistClick(() => {
      this._onWatchlistChange(movie);
    });

    this._movieDetailsComponent.setOnAlreadyWatchedClick(() => {
      this._onAlreadyWatchedChange(movie);
    });

    this._movieDetailsComponent.setOnAddToFavoritesClick(() => {
      this._onFavoritesChange(movie);
    });

    this._movieDetailsComponent.setOnCommentDeleteClick((commentId, button) => {
      this._onDataChange({movie, commentId, button}, null);
    });
    this._movieDetailsComponent._subscribeOnEvents();
  }

  _onWatchlistChange(movie) {
    const newMovie = MovieModel.clone(movie);
    newMovie.userDetails.watchlist = !newMovie.userDetails.watchlist;
    this._onDataChange(movie, newMovie);
  }

  _onAlreadyWatchedChange(movie) {
    const newMovie = MovieModel.clone(movie);
    newMovie.userDetails.alreadyWatched = !newMovie.userDetails.alreadyWatched;
    newMovie.userDetails.watchingDate = newMovie.userDetails.alreadyWatched ? new Date().toISOString() : null;

    this._onDataChange(movie, newMovie);
  }

  _onFavoritesChange(movie) {
    const newMovie = MovieModel.clone(movie);
    newMovie.userDetails.favorite = !movie.userDetails.favorite;

    this._onDataChange(movie, newMovie);
  }


  _onAddNewComment(evt) {
    const isCombination = evt.key === `Enter` && (evt.ctrlKey || evt.metaKey);

    if (isCombination) {
      const {formElements, comment, movieId} = this._movieDetailsComponent.getData();

      /* Если не заполнен текст комментария либо не выбрана эмоция, метод завершает работу */
      if (Object.values(comment).some((prop) => !prop)) {
        return;
      }

      formElements.forEach((element) => {
        element.disabled = true;

        if (element.tagName === COMMENT_ELEMENT) {
          element.style.boxShadow = null;
        }
      });

      /* Удаляем обработчик отправки формы, чтобы пользователь не мог отправить новый комментарий, пока не обработан старый */
      document.removeEventListener(`keydown`, this._onAddNewComment);
      this._onDataChange(null, {comment, movieId, onAddNewComment: this._onAddNewComment});
    }
  }
}
