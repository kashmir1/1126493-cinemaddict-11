import AbstractComponent from "./abstract-component";

const createCommentedFilmsList = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
       </section>`
  );
};

export default class CommentedFilmsList extends AbstractComponent {
  getTemplate() {
    return createCommentedFilmsList();
  }
}
