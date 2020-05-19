import {getDate, getFormatDateTime, formatRuntime} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    const {smile, commentText, author, commentDate} = comment;

    const dateTime = getFormatDateTime(commentDate);

    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${smile}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${commentText}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dateTime}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
    );
  }).join(`\n`);
};


const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};


const createMovieDetail = (movie, commentEmoji) => {

  const {
    title,
    poster,
    originalName,
    rate,
    description,
    director,
    writers,
    actors,
    dateRelease,
    runtime,
    country,
    genres,
    ageRate,
    comments,
    watchlist,
    favorite,
    alreadyWatched
  } = movie;

  const release = getDate(dateRelease);
  const runTime = formatRuntime(runtime);
  const commentsMarkup = createCommentsMarkup(comments);
  const genresMarkup = createGenresMarkup(genres);

  const isWatchlist = watchlist ? `checked` : ``;
  const isFavorite = favorite ? `checked` : ``;
  const isAlreadyWatched = alreadyWatched ? `checked` : ``;

  const emojiMarkup = commentEmoji ? `<img src="./images/emoji/${commentEmoji}.png" alt="${commentEmoji}" width="55" height="55">` : ` `;

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRate}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalName}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rate}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
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
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
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
           <div for="add-emoji" class="film-details__add-emoji-label">
              <input type="hidden" name="add-emoji" value="${commentEmoji || ``}">
              ${emojiMarkup}
            </div>
          <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`
  );
};

export default class MovieDetail extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._commentEmoji = null;
    this._setPopupCloseButtonClickHandler = null;
    this._addWatchListHandler = null;
    this._addWatchedHandler = null;
    this._addFavoriteHandler = null;
    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setPopupCloseButtonClick(this._setPopupCloseButtonClickHandler);
    this.setAddWatchListChangeHandler(this._addWatchListHandler);
    this.setAddWatchedChangeHandler(this._addWatchedHandler);
    this.setAddFavoriteChangeHandler(this._addFavoriteHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createMovieDetail(this._movie, this._commentEmoji);
  }

  setPopupCloseButtonClick(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._setPopupCloseButtonClickHandler = handler;
  }

  removePopupCloseButtonClick(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, handler);
  }

  setAddWatchListChangeHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);
    this._addWatchListHandler = handler;
  }

  setAddWatchedChangeHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);
    this._addWatchedHandler = handler;
  }

  setAddFavoriteChangeHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);
    this._addFavoriteHandler = handler;
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__inner`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.name !== `comment-emoji`) {
          return;
        }

        this._commentEmoji = evt.target.value;
        this.rerender();
      });
  }
}
