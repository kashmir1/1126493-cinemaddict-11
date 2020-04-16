import {getRandomItem, formatTime, writeTimeFormat} from "../utils";
import {commentator, commentText, smiles, MONTH_NAMES} from "../consts";

const createCommentsCount = (count) => {
  return (
    `<span class="film-details__comments-count">${count}</span>`
  );
};

const createComment = (smile, text, author, date) => {
  return (
    `    <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${smile}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
  );
};

export const createComments = () => {

  const commentsData = createCommentsCount(3);
  const comment = [{
    smile: `./images/emoji/` + getRandomItem(smiles),
    commentText: getRandomItem(commentText),
    author: getRandomItem(commentator),
    commentDate: new Date(),
  },
  {
    smile: `./images/emoji/` + getRandomItem(smiles),
    commentText: getRandomItem(commentText),
    author: getRandomItem(commentator),
    commentDate: new Date(),
  },
  {
    smile: `./images/emoji/` + getRandomItem(smiles),
    commentText: getRandomItem(commentText),
    author: getRandomItem(commentator),
    commentDate: new Date(),
  },
  {
    smile: `./images/emoji/` + getRandomItem(smiles),
    commentText: getRandomItem(commentText),
    author: getRandomItem(commentator),
    commentDate: new Date(),
  },
  ].map((it) => createComment(it.smile, it.commentText, it.author, it.commentDate)).join(`\n`);


  // // const {smile, commentText, commentator, commentDate} = comment;
  // const isDateShowing = !!commentDate;
  // //
  // // Выводим дату используя метод получения года, функцию формата месяца с нулем и текущую дату
  // const date = isDateShowing ? `${commentDate.getFullYear()}/${writeTimeFormat(MONTH_NAMES[4], 2, 0)}/${commentDate.getDate()} ` : ``;
  //
  // // Выводим время с помощью фунции в utils
  // const time = isDateShowing ? formatTime(commentDate) : ``;

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsData}</span></h3>

        <ul class="film-details__comments-list">
            ${comment}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

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
            `
  );
};
