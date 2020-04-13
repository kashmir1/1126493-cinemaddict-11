import {formatTime, commentMonthFormat} from "../utils";
import {MONTH_NAMES} from "../consts";

export const createComments = (comment) => {

  const {smile, commentText, commentator, commentDate} = comment;
  const isDateShowing = !!commentDate;

  const date = isDateShowing ? `${commentDate.getFullYear()}/${commentMonthFormat(MONTH_NAMES[commentDate.getMonth()])}/${commentDate.getDate()} ` : ``;
  const time = isDateShowing ? formatTime(commentDate) : ``;

  return (
    ` <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${smile}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${commentText}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentator}</span>
                <span class="film-details__comment-day">${date} ${time}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
  );
};
