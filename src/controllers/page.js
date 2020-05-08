const FILM_LIST_EXTRA_QUANTITY = 2;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

import FilmListComponent from "../components/film-list";
import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import MovieController from "./movie";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmsComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more";
import TopFilmsListComponent from "../components/top-list";
import CommentedFilmsListComponent from "../components/comment-list";
import SortListComponent, {SortType} from "../components/sort";

const renderMovieCard = (container, filmDetail) => {

  const filmCardComponent = new FilmCardComponent(filmDetail);
  const filmDetailsComponent = new FilmDetailComponent(filmDetail);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  // Компонент нажатия на элементы списка карточки фильма
  filmCardComponent.setPopupOpenedClick(() => {
    render(container, filmDetailsComponent, RenderPosition.BEFOREEND);
    filmDetailsComponent.setPopupCloseButtonClick(onPopupCloseButtonClick);
    filmCardComponent.setPopupKeydown(handlePopupKeydown);
  });

  // Удаление компонента описание фильма и обработчиков
  const removeFilmDetailsComponent = () => {
    remove(filmDetailsComponent);
    filmDetailsComponent.removePopupCloseButtonClick(onPopupCloseButtonClick);
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
};

// Логика сортировки
const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderMovies = (filmsListContainer, films) => {
  films.forEach((card) => {
    renderMovieCard(filmsListContainer, card);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];

    this._sortListComponent = new SortListComponent();
    this._filmListComponent = new FilmListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopFilmsListComponent = new TopFilmsListComponent();
    this._CommentedFilmsListComponent = new CommentedFilmsListComponent();
    this._showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortListComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }


  render(films) {
    this._films = films;
    render(this._container, this._sortListComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmListComponent, RenderPosition.BEFOREEND);

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
    renderMovies(filmsListContainer, films.slice(1, this._showingMovieCardCount));


    this._renderShowMoreButton();

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._TopFilmsListComponent, RenderPosition.BEFOREEND);

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._CommentedFilmsListComponent, RenderPosition.BEFOREEND);

    // Объявление контейнеров для добавление разметки
    const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmsListTopRatedContainer = filmsExtraElement[0];
    const filmsListMostCommentedContainer = filmsExtraElement[1];

    // Добавление карточек с высоким рейтингом в DOM
    renderMovies(filmsListTopRatedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY));
    // Добавление карточек с большим количеством комментарив в DOM
    renderMovies(filmsListMostCommentedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY));


  }

  _renderShowMoreButton() {
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    // Добавление кнопки показать еще в DOM
    render(filmsListElement, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);

    // Обработчик события нажатия на кнопку загрузить еще
    this._ShowMoreButtonComponent.setClickHandler(() => {
      // Получает количество карточек отображаемых изначально
      const prevMovieCardCount = this._showingMovieCardCount;

      // Увеличение счетчика отображаемых карточек
      this._showingMovieCardCount = this._showingMovieCardCount + SHOWING_FILM_COUNT_BY_BUTTON;

      // Добавление новых карточек
      this._films.slice(prevMovieCardCount, this._showingMovieCardCount).forEach((card) => {
        renderMovieCard(filmsListContainer, card);
      });

      // Удаление кнопки загрузить еще по условию
      if (this._showingMovieCardCount >= this._films.length) {
        remove(this._ShowMoreButtonComponent);
        this._ShowMoreButtonComponent.removeElement();
      }
    });
  }

  // Добавление сортировки
  _onSortTypeChange(sortType) {
    const filmsElement = this._container.querySelector(`.films`);
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    this._showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._films, sortType, 1, this._showingMovieCardCount);

    filmsListContainer.innerHTML = ``;
    renderMovies(filmsListContainer, sortedFilms);

    this._renderShowMoreButton();
  }
}
