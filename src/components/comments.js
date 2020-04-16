import {formatTime, writeTimeFormat} from "../utils";
import {MONTH_NAMES} from "../consts";

export const createComments = (comment) => {

  const [{smile, commentText, author, commentDate}] = comment;
  const isDateShowing = !!commentDate;

  // Выводим дату используя метод получения года, функцию формата месяца с нулем и текущую дату
  const date = isDateShowing ? `${commentDate.getFullYear()}/${writeTimeFormat(MONTH_NAMES[4], 2, 0)}/${commentDate.getDate()} ` : ``;

  // Выводим время с помощью фунции в utils
  const time = isDateShowing ? formatTime(commentDate) : ``;

  return (
    ` <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${smile}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${commentText}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date} ${time}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
  );
};
