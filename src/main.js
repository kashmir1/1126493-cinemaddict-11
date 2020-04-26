const MOVIE_CARD_QUANTITY = 15;
const FILM_LIST_EXTRA_QUANTITY = 2;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

import UserRankComponent from "./components/rank";
import NavigationComponent from "./components/navigation";
import SortListComponent from "./components/sort";
import FilmsListComponent from "./components/film-list";
import TopFilmsListComponent from "./components/top-list";
import CommentedFilmsListComponent from "./components/comment-list";
import FilmCardComponent from "./components/film-card";
import ShowMoreButtonComponent from "./components/show-more";
import FilmDetailComponent from "./components/film-detail";
import FooterStatisticsComponent from "./components/footer-statistics";


// Моки
import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

const films = generateFilms(MOVIE_CARD_QUANTITY);
const filters = generateFilters();

render(headerElem, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElem, new NavigationComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElem, new SortListComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElem, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


// Объявление контейнеров для добавление разметки
const filmsElement = mainElem.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

const renderMovieCard = (container, filmDetail) => {

  const movieCardComponent = new FilmCardComponent(filmDetail);
  const filmDetailsComponent = new FilmDetailComponent(filmDetail);

  render(container, movieCardComponent.getElement(), RenderPosition.BEFOREEND);

  const filmPoster = movieCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = movieCardComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = movieCardComponent.getElement().querySelector(`.film-card__comments`);

  const popupCloseButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const filmElements = [filmPoster, filmTitle, filmComments];

  // Функция закрытия по ESC

  filmElements.forEach((element) => {
    element.addEventListener(`click`, () => {
      render(footerElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    });
  });

  popupCloseButton.addEventListener(`click`, () => {
    filmDetailsComponent.getElement().remove();
  });
};

const renderMovies = (filmDetailsList) => {
  // Показывает количество карточек в начале
  let showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

  // Добавление карточек в DOM
  filmDetailsList.slice(1, showingMovieCardCount).forEach((card) => {
    renderMovieCard(filmsListContainer, card);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();

  // Добавление кнопки показать еще в DOM
  render(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  // Обработчик события нажатия на кнопку загрузить еще
  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    // Получает количество карточек отображаемых изначально
    const prevMovieCardCount = showingMovieCardCount;

    // Увеличение счетчика отображаемых карточек
    showingMovieCardCount = showingMovieCardCount + SHOWING_FILM_COUNT_BY_BUTTON;

    // Добавление новых карточек
    filmDetailsList.slice(prevMovieCardCount, showingMovieCardCount).forEach((card) => {
      // render(filmsListContainer, new MovieCardComponent(card).getElement(), RenderPosition.BEFOREEND);
      renderMovieCard(filmsListContainer, card);
    });

    // Удаление кнопки загрузить еще по условию
    if (showingMovieCardCount >= filmDetailsList.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });

  // Добавление шаблона с дополнительными фильмами в DOM
  render(filmsElement, new TopFilmsListComponent().getElement(), RenderPosition.BEFOREEND);

  // Добавление шаблона с дополнительными фильмами в DOM
  render(filmsElement, new CommentedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);

  // Объявление контейнеров для добавление разметки
  const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);
  const filmsListTopRatedContainer = filmsExtraElement[0].querySelector(`.films-list__container`);
  const filmsListMostCommentedContainer = filmsExtraElement[1].querySelector(`.films-list__container`);

  // Добавление карточек с высоким рейтингом в DOM
  filmDetailsList.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
    // render(filmsListTopRatedContainer, new MovieCardComponent(card).getElement(), RenderPosition.BEFOREEND);
    renderMovieCard(filmsListTopRatedContainer, card);
  });

  // Добавление карточек с большим количеством комментарив в DOM
  filmDetailsList.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
    // render(filmsListMostCommentedContainer, new MovieCardComponent(card).getElement(), RenderPosition.BEFOREEND);
    renderMovieCard(filmsListMostCommentedContainer, card);
  });
};

// Объявление контейнеров для добавление разметки
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

// Добавление блока статистика в DOM
render(footerStatisticsElement, new FooterStatisticsComponent(films.length).getElement(), RenderPosition.BEFOREEND);
renderMovies(films);


