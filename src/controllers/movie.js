
import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import {render, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailComponent(film);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);

    // Компонент нажатия на элементы списка карточки фильма
    this._filmCardComponent.setPopupOpenedClick(() => {
      render(this._container, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      this._filmDetailsComponent.setPopupCloseButtonClick(onPopupCloseButtonClick);
      this._filmCardComponent.setPopupKeydown(handlePopupKeydown);
    });

    // Удаление компонента описание фильма и обработчиков
    const removeFilmDetailsComponent = () => {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.removePopupCloseButtonClick(onPopupCloseButtonClick);
      document.removeEventListener(`keydown`, handlePopupKeydown);
    };

    const onPopupCloseButtonClick = (evt) => {
      evt.preventDefault();
      removeFilmDetailsComponent();
    };

    const handlePopupKeydown = (evt) => {
      evt.preventDefault();
      if (evt.key === `Escape` || evt.key === `Esc`) {
        removeFilmDetailsComponent();
      }
    };
  }
}
