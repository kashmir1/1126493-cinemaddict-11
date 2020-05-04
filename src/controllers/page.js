const FILM_LIST_EXTRA_QUANTITY = 2;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

import FilmListComponent from "../components/film-list";
import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
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

const renderFilms = (filmsListContainer, films) => {
  films.forEach((card) => {
    renderMovieCard(filmsListContainer, card);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortListComponent = new SortListComponent();
    this._filmListComponent = new FilmListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._TopFilmsListComponent = new TopFilmsListComponent();
    this._CommentedFilmsListComponent = new CommentedFilmsListComponent();
  }

  render(films) {
    render(this._container, this._sortListComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmListComponent, RenderPosition.BEFOREEND);
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
    renderFilms(filmsListContainer, films.slice(1, showingMovieCardCount));

    const showMoreButtonComponent = this._ShowMoreButtonComponent;

    const renderShowMoreButton = () => {
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
    };

    renderShowMoreButton();

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._TopFilmsListComponent, RenderPosition.BEFOREEND);

    // Добавление шаблона с дополнительными фильмами в DOM
    render(filmsElement, this._CommentedFilmsListComponent, RenderPosition.BEFOREEND);

    // Объявление контейнеров для добавление разметки
    const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmsListTopRatedContainer = filmsExtraElement[0];
    const filmsListMostCommentedContainer = filmsExtraElement[1];

    // Добавление карточек с высоким рейтингом в DOM
    renderFilms(filmsListTopRatedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY));
    // Добавление карточек с большим количеством комментарив в DOM
    renderFilms(filmsListMostCommentedContainer, films.slice(0, FILM_LIST_EXTRA_QUANTITY));

    // Добавление сортировки
    this._sortListComponent.setSortTypeChangeHandler((sortType) => {
      showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

      const sortedFilms = getSortedFilms(films, sortType, 1, showingMovieCardCount);

      filmsListContainer.innerHTML = ``;
      renderFilms(filmsListContainer, sortedFilms);

      renderShowMoreButton();
    });
  }
}
