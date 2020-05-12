import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import {render, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._removeFilmDetailsComponent = this._removeFilmDetailsComponent.bind(this);
    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._handlePopupKeydown = this._handlePopupKeydown.bind(this);
  }

  render(movie) {
    this._filmCardComponent = new FilmCardComponent(movie);
    this._filmDetailsComponent = new FilmDetailComponent(movie);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._subscribeOnCardEvents(movie);
  }

  _removeFilmDetailsComponent() {
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent.removePopupCloseButtonClick(this._onPopupCloseButtonClick);
    document.removeEventListener(`keydown`, this._handlePopupKeydown);
  }

  _onPopupCloseButtonClick(evt) {
    evt.preventDefault();
    this._removeFilmDetailsComponent();
  }

  _handlePopupKeydown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._removeFilmDetailsComponent();
    }
  }

  _subscribeOnCardEvents(movie) {
    // Компонент нажатия на элементы списка карточки фильма
    this._filmCardComponent.setPopupOpenedClick(() => {
      render(this._container, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      this._subscribeOnPopupEvents(movie);
    });

    // Подписка на событие
    this._filmCardComponent.setOnAddToWatchlistButtonClick(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatchList: !movie.isWatchList,
      }));
    });

    this._filmCardComponent.setOnAlreadyWatchedButtonClick(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isAlreadyWatched: !movie.isAlreadyWatched,
      }));
    });

    this._filmCardComponent.setOnFavoriteButtonClick(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });
  }

  _subscribeOnPopupEvents(movie) {
    this._filmDetailsComponent.setPopupCloseButtonClick(this._removeFilmDetailsComponent);
    this._filmCardComponent.setPopupKeydown(this._handlePopupKeydown);

    this._filmDetailsComponent.setOnAddToWatchlistClick(() => {
      this._setOnAddToWatchlistClick(movie);
    });

    this._filmDetailsComponent.setOnAlreadyWatchedClick(() => {
      this._onAlreadyWatchedChange(movie);
    });

    this._filmDetailsComponent.setOnAddToFavoritesClick(() => {
      this._setOnAddToFavoritesClick(movie);
    });
  }

  _setOnAddToWatchlistClick(movie) {
    this._onDataChange(movie, Object.assign({}, movie, {
      isWatchList: !movie.isWatchList,
    }));
  }

  _onAlreadyWatchedChange(movie) {
    this._onDataChange(this, movie, Object.assign({}, movie, {
      isAlreadyWatched: !movie.isAlreadyWatched,
    }));
  }

  _setOnAddToFavoritesClick(movie) {
    this._onDataChange(this, movie, Object.assign({}, movie, {
      isFavorite: !movie.isFavorite,
    }));
  }
}
