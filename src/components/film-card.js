import {getTime} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-card__genre">${genre}</span>`
    );
  }).join(``);
};

const createFilmCard = (film) => {

  // создаем моки для карточки
  const {title, poster, description, rate, year, runtime, genres, comments} = film;
  const time = getTime(runtime);
  const genreMarkup = createGenreMarkup(genres);

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${time}</span>
            ${genreMarkup}
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

// Класс карточка фильма
export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setPopupOnenedClick(handler) {
    const filmPoster = this.getElement().querySelector(`.film-card__poster`);
    const filmTitle = this.getElement().querySelector(`.film-card__title`);
    const filmComments = this.getElement().querySelector(`.film-card__comments`);

    const filmElements = [filmPoster, filmTitle, filmComments];

    filmElements.forEach((element) => element.addEventListener(`click`, handler));
  }
}
