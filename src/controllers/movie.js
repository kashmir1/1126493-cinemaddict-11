import MovieCardComponent from "../components/movie-card";
import MovieDetailComponent from "../components/movie-detail";
import {render, remove, replace, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;


    this._movieCardComponent = null;
    this._movieDetailsComponent = null;

    this._removeMovieDetailsComponent = this._removeMovieDetailsComponent.bind(this);
    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._handlePopupKeydown = this._handlePopupKeydown.bind(this);
  }

  render(movie) {

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
      render(this._container, this._movieCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeMovieDetailsComponent();
    }
  }

  _removeMovieDetailsComponent() {
    remove(this._movieDetailsComponent);
    this._movieDetailsComponent.removePopupCloseButtonClick(this._onPopupCloseButtonClick);
    document.removeEventListener(`keydown`, this._handlePopupKeydown);
    this._mode = Mode.DEFAULT;
  }

  _onPopupCloseButtonClick(evt) {
    evt.preventDefault();
    this._removeMovieDetailsComponent();
  }

  _handlePopupKeydown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._removeMovieDetailsComponent();
    }
  }

  _subscribeOnCardEvents(movie) {
    // Компонент нажатия на элементы списка карточки фильма
    this._movieCardComponent.setPopupOpenedClick(() => {
      this._onViewChange();
      render(this._container, this._movieDetailsComponent, RenderPosition.BEFOREEND);
      this._subscribeOnPopupEvents(movie);
      document.addEventListener(`keydown`, this._handlePopupKeydown); // под вопросом
      this._mode = Mode.DETAILS;
    });

    // Подписка на событие
    this._movieCardComponent.setAddWatchListClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        watchlist: !movie.watchlist,
      }));
    });

    this._movieCardComponent.setAddWatchedClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        alreadyWatched: !movie.alreadyWatched,
      }));
    });

    this._movieCardComponent.setAddFavoriteClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        favorite: !movie.favorite,
      }));
    });
  }

  _subscribeOnPopupEvents(movie) {
    this._movieDetailsComponent.setPopupCloseButtonClick(this._removeMovieDetailsComponent);
    this._movieCardComponent.setPopupKeydown(this._handlePopupKeydown);

    this._movieDetailsComponent.setAddWatchListChangeHandler(() => {
      this._addWatchListHandler(movie);
    });

    this._movieDetailsComponent.setAddWatchedChangeHandler(() => {
      this._addWatchedHandler(movie);
    });

    this._movieDetailsComponent.setAddFavoriteChangeHandler(() => {
      this._addFavoriteHandler(movie);
    });

    this._movieDetailsComponent._subscribeOnEvents();
  }

  _addWatchListHandler(movie) {
    this._onDataChange(this, movie, Object.assign({}, movie, {
      watchlist: !movie.watchlist,
    }));
  }

  _addWatchedHandler(movie) {
    this._onDataChange(this, movie, Object.assign({}, movie, {
      alreadyWatched: !movie.alreadyWatched,
    }));
  }

  _addFavoriteHandler(movie) {
    this._onDataChange(this, movie, Object.assign({}, movie, {
      favorite: !movie.favorite,
    }));
  }
}
