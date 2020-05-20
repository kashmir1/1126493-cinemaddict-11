import {formatRuntime, getYear} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-card__genre">${genre}</span>`
    );
  }).join(``);
};

const createMovieCard = (movie) => {

  // создаем моки для карточки
  const {title, poster, description, rate, year, runtime, genres, comments, watchlist, favorite, alreadyWatched} = movie;
  const runTime = formatRuntime(runtime);
  const genreMarkup = createGenreMarkup(genres);
  const movieYear = getYear(year);

  const alreadyWatchListClass = watchlist ? `film-card__controls-item--active` : ``;
  const favoriteClass = favorite ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = alreadyWatched ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${movieYear}</span>
            <span class="film-card__duration">${runTime}</span>
            ${genreMarkup}
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${alreadyWatchListClass}">Add to watchlist</button>
            <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClass}">Mark as watched</button>
            <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
          </form>
        </article>`
  );
};

// Класс карточка фильма
export default class MovieCard extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createMovieCard(this._movie);
  }

  setPopupOpenedClick(handler) {
    const moviePoster = this.getElement().querySelector(`.film-card__poster`);
    const movieTitle = this.getElement().querySelector(`.film-card__title`);
    const movieComments = this.getElement().querySelector(`.film-card__comments`);

    const movieElements = [moviePoster, movieTitle, movieComments];

    movieElements.forEach((element) => element.addEventListener(`click`, handler));
  }

  setPopupKeydown(handler) {
    document.addEventListener(`keydown`, handler);
  }

  // Добавляем обработчики на кнопки
  setAddWatchListClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setAddWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setAddFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
