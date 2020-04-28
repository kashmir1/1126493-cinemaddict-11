import AbstractComponent from "./abstract-component";

const createTopFilmsList = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
       </section>`
  );
};

// Класс фильмы по рейтингу
export default class TopFilmsList extends AbstractComponent {
  getTemplate() {
    return createTopFilmsList();
  }
}
