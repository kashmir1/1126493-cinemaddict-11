import {createElement} from "../utils";

const createCommentedFilmsList = () => {
  return (
    ` <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
       </section>`
  );
};

// Класс фильмы из раздела дополнительно
export default class CommentedFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentedFilmsList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
