import MovieCardComponent from "../components/movie-card";
import MovieDetailComponent from "../components/movie-detail";
import {render, remove, replace, RenderPosition} from "../utils/render";

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

    this._removeMovieDetailsComponent = this._removeMovieDetailsComponent.bind(this);
    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._handlePopupKeydown = this._handlePopupKeydown.bind(this);
  }

  render(movie) {
    this.id = movie.id;

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

  destroy() {
    remove(this._movieCardComponent);
    remove(this._movieDetailsComponent);
    document.removeEventListener(`keydown`, this._handlePopupKeydown);
  }

  _removeMovieDetailsComponent() {
    remove(this._movieDetailsComponent);
    document.removeEventListener(`keydown`, this._handlePopupKeydown);
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
      render(document.body, this._movieDetailsComponent, RenderPosition.BEFOREEND);
      this._subscribeOnPopupEvents(movie);
      document.addEventListener(`keydown`, this._handlePopupKeydown);
      this._mode = Mode.DETAILS;
    });

    this._movieCardComponent.setOnAddToWatchlistButtonClick(() => {
      this._onWatchlistChange(movie);
    });

    this._movieCardComponent.setOnAlreadyWatchedButtonClick(() => {
      this._onAlreadyWatchedChange(movie);
    });

    this._movieCardComponent.setOnFavoriteButtonClick(() => {
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

    this._movieDetailsComponent._subscribeOnEvents();
  }

  _onWatchlistChange(movie) {
    this._onDataChange(movie, Object.assign({}, movie, {
      watchlist: !movie.watchlist
    }));
  }

  _onAlreadyWatchedChange(movie) {
    this._onDataChange(movie, Object.assign({}, movie, {
      alreadyWatched: !movie.alreadyWatched
    }));
  }

  _onFavoritesChange(movie) {
    this._onDataChange(movie, Object.assign({}, movie, {
      favorite: !movie.favorite
    }));
  }
}
