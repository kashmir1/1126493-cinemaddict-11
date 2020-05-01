const FILM_LIST_EXTRA_QUANTITY = 2;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;


import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmsComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more";
import TopFilmsListComponent from "../components/top-list";
import CommentedFilmsListComponent from "../components/comment-list";

const renderMovieCard = (container, filmDetail) => {

  const movieCardComponent = new FilmCardComponent(filmDetail);
  const filmDetailsComponent = new FilmDetailComponent(filmDetail);

  render(container, movieCardComponent, RenderPosition.BEFOREEND);

  const filmPoster = movieCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = movieCardComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = movieCardComponent.getElement().querySelector(`.film-card__comments`);

  const filmElements = [filmPoster, filmTitle, filmComments];

  // Обработчик нажатия на элементы списка карточки фильма
  filmElements.forEach((element) => {
    element.addEventListener(`click`, () => {
      render(container, filmDetailsComponent, RenderPosition.BEFOREEND);
      filmDetailsComponent.setPopupCloseButtonClick(onPopupCloseButtonClick);
      document.addEventListener(`keydown`, onPopupEscButtonKeydown);
    });
  });


  // Удаление компонента описание фильма и обработчиков
  const removeFilmDetailsComponent = () => {
    remove(filmDetailsComponent);
    filmDetailsComponent.removePopupCloseButtonClick(onPopupCloseButtonClick);
    document.removeEventListener(`keydown`, onPopupEscButtonKeydown);
  };

  const onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    removeFilmDetailsComponent();
  };

  const onPopupEscButtonKeydown = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      removeFilmDetailsComponent();
    }
  };
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopFilmsListComponent = new TopFilmsListComponent();
    this._CommentedFilmsListComponent = new CommentedFilmsListComponent();
  }

  render(films) {
    let showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

    const isFilmDetails = !!films.length;
    if (!isFilmDetails) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Объявление контейнеров для добавление разметки
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    // Добавление карточек в DOM
    films.slice(1, showingMovieCardCount).forEach((card) => {
      renderMovieCard(filmsListContainer, card);
    });

    const showMoreButtonComponent = this._ShowMoreButtonComponent;

    // Добавление кнопки показать еще в DOM
    render(filmsListElement, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);

    // Обработчик события нажатия на кнопку загрузить еще
    this._ShowMoreButtonComponent.setClickHandler(() => {
      // Получает количество карточек отображаемых изначально
      const prevMovieCardCount = showingMovieCardCount;

      // Увеличение счетчика отображаемых карточек
      showingMovieCardCount = showingMovieCardCount + SHOWING_FILM_COUNT_BY_BUTTON;

      // Добавление новых карточек
      films.slice(prevMovieCardCount, showingMovieCardCount).forEach((card) => {
        renderMovieCard(filmsListContainer, card);
      });

      // Удаление кнопки загрузить еще по условию
      if (showingMovieCardCount >= films.length) {
        remove(this._ShowMoreButtonComponent);
        showMoreButtonComponent.removeElement();
      }
    });

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._TopFilmsListComponent, RenderPosition.BEFOREEND);

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._CommentedFilmsListComponent, RenderPosition.BEFOREEND);

    // Объявление контейнеров для добавление разметки
    const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmsListTopRatedContainer = filmsExtraElement[0];
    const filmsListMostCommentedContainer = filmsExtraElement[1];

    // Добавление карточек с высоким рейтингом в DOM
    films.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
      renderMovieCard(filmsListTopRatedContainer, card);
    });

    // Добавление карточек с большим количеством комментарив в DOM
    films.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
      renderMovieCard(filmsListMostCommentedContainer, card);
    });
  }
}
