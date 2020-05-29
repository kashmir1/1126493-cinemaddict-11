import {formatRuntime, getYear} from "../utils/common";
import AbstractComponent from "./abstract-component";

const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_END_CHECK = /[\s.,]$/;


const formatDescription = (desc) => {
  let formattedDesc = desc;
  if (DESCRIPTION_END_CHECK.test(formattedDesc)) {
    formattedDesc = formatDescription(formattedDesc.replace(DESCRIPTION_END_CHECK, ``));
  }

  return formattedDesc;
};

const createMovieCard = (movie) => {
  const {comments} = movie;
  const {title, totalRating, poster, release: {date}, runtime, genre, description} = movie.filmInfo;
  const {watchlist, favorite, alreadyWatched} = movie.userDetails;
  const runTime = formatRuntime(runtime);
  const genreList = [...genre].join(`, `);
  const movieYear = getYear(date);

  const isDescriptionExcess = description.length > DESCRIPTION_MAX_LENGTH;
  const formattedDescription = isDescriptionExcess ? `${formatDescription(description.slice(0, DESCRIPTION_MAX_LENGTH - 1))}…` : description;


  const alreadyWatchListClass = watchlist ? `film-card__controls-item--active` : ``;
  const favoriteClass = favorite ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = alreadyWatched ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${movieYear}</span>
            <span class="film-card__duration">${runTime}</span>
           <span class="film-card__genre">${genreList}</span>
          </p>
            <img src="./${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${formattedDescription}</p>
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

  setOnDetailsOpenersClick(handler) {
    const moviePosterElement = this.getElement().querySelector(`.film-card__poster`);
    const movieTitleElement = this.getElement().querySelector(`.film-card__title`);
    const movieCommentsCountElement = this.getElement().querySelector(`.film-card__comments`);
    /* Сохраняет все элементы, клик на которые вызывает показ попапа с подробной информацией о фильме, в массив */
    const detailsOpeners = [moviePosterElement, movieTitleElement, movieCommentsCountElement];

    /* Добавляет обработчик клика, вызывающий показ попапа с подробной информацией о фильме */
    detailsOpeners.forEach((detailsOpener) => detailsOpener.addEventListener(`click`, handler));
  }

  setPopupKeydown(handler) {
    document.addEventListener(`keydown`, handler);
  }

  // Добавляем обработчики на кнопки
  setOnAddToWatchlistButtonClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setOnAlreadyWatchedButtonClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setOnFavoriteButtonClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
