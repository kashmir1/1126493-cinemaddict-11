
import {getDate, getFormatDateTime, formatRuntime} from "../utils/common";
import AbstractComponent from './abstract-component.js';
import {SMILES} from "../consts";
import {encode} from 'he';
const FORMAT_DATE_OPTION = `comment`;


const createCommentsMarkup = (comments) => {
  return comments
    .reduce((acc, {id, author, comment, date, emotion}, i) => {
      const newline = i === 0 ? `` : `\n`;
      const template = (
        `<li data-id="${id}" class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${getFormatDateTime(date, FORMAT_DATE_OPTION)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      );
      return `${acc}${newline}${template}`;
    }, ``);
};


const createGenresMarkup = (genres) => {
  return [...genres]
    .reduce((acc, genre, i) => {
      const newline = i === 0 ? `` : `\n`;
      return `${acc}${newline}<span class="film-details__genre">${genre}</span>`;
    }, ``);
};

const createSelectedEmojiMarkup = (emoji) => `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;

const createReactionsMarkup = (emojis) => {
  return emojis
    .reduce((acc, emoji, i) => {
      const newline = i === 0 ? `` : `\n`;
      const template = (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}"}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`
      );
      return `${acc}${newline}${template}`;
    }, ``);
};

const createMovieDetail = (movie) => {
  const {watchlist, favorite, alreadyWatched} = movie.userDetails;
  const {comments} = movie;

  const {title, totalRating, alternativeTitle, poster, ageRating, director, writers, actors, release: {date, releaseCountry}, runtime, genre, description} = movie.filmInfo;
  const release = getDate(date);
  const runTime = formatRuntime(runtime);
  const commentsMarkup = createCommentsMarkup(comments);
  const genresMarkup = createGenresMarkup(genre);

  const isWatchlist = watchlist ? `checked` : ``;
  const isFavorite = favorite ? `checked` : ``;
  const isAlreadyWatched = alreadyWatched ? `checked` : ``;

  const reactionsMarkup = createReactionsMarkup(SMILES);
  const formattedWriters = [...writers].join(`, `);
  const formattedActors = [...actors].join(`, `);

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="">
          <p class="film-details__age">${ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${formattedWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${formattedActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${release}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.size === 1 ? `Genre` : `Genres`}</td>
              <td class="film-details__cell">
             ${genresMarkup}
                </td>
            </tr>
          </table>
          <p class="film-details__film-description">
           ${description}
          </p>
        </div>
      </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
    </div>
    <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments<span class="film-details__comments-count"> ${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>
        <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
             <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
               <div class="film-details__emoji-list">
                ${reactionsMarkup}
              </div>
        </div>
      </section>
    </div>
  </form>
</section>`
  );
};

const parseFormData = (formData) => {
  return {
    comment: encode(formData.get(`comment`)),
    date: new Date().toISOString(),
    emotion: formData.get(`comment-emoji`),
    author: `User`
  };
};

export default class MovieDetails extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this.getData = this.getData.bind(this);
  }
  getTemplate() {
    return createMovieDetail(this._movie);
  }

  setPopupCloseButtonClick(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setOnAddToWatchlistClick(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setOnAlreadyWatchedClick(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setOnAddToFavoritesClick(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }

  setOnCommentDeleteClick(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        button.disabled = true;
        button.textContent = `Deleting...`;
        const commentId = button.closest(`.film-details__comment`).dataset.id;

        handler(commentId, button);
      }));
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__inner`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.name !== `comment-emoji`) {
          return;
        }
        this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = createSelectedEmojiMarkup(evt.target.value);

      });
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return {
      /* Элементы, которые нужно заблокировать при отправке нового комментария */
      formElements: form.querySelectorAll(`input, textarea, button`),
      comment: parseFormData(formData),
      movieId: this._movie.id
    };
  }
}
