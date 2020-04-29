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
import {footerElement, mainElem, filmsListContainer, filmsElement, filmsListElement} from "../main";


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
      render(footerElement, filmDetailsComponent, RenderPosition.BEFOREEND);
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

const renderMovies = (filmDetailsList) => {
  // Показывает количество карточек в начале
  let showingMovieCardCount = SHOWING_FILM_COUNT_ON_START;

  const isFilmDetails = !!filmDetailsList.length;
  if (!isFilmDetails) {
    render(mainElem, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  // Добавление карточек в DOM
  filmDetailsList.slice(1, showingMovieCardCount).forEach((card) => {
    renderMovieCard(filmsListContainer, card);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();

  // Добавление кнопки показать еще в DOM
  render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

  // Обработчик события нажатия на кнопку загрузить еще
  showMoreButtonComponent.setClickHandler(() => {
    // Получает количество карточек отображаемых изначально
    const prevMovieCardCount = showingMovieCardCount;

    // Увеличение счетчика отображаемых карточек
    showingMovieCardCount = showingMovieCardCount + SHOWING_FILM_COUNT_BY_BUTTON;

    // Добавление новых карточек
    filmDetailsList.slice(prevMovieCardCount, showingMovieCardCount).forEach((card) => {
      renderMovieCard(filmsListContainer, card);
    });

    // Удаление кнопки загрузить еще по условию
    if (showingMovieCardCount >= filmDetailsList.length) {
      remove(showMoreButtonComponent);
      showMoreButtonComponent.removeElement();
    }
  });

  // Добавление шаблона с дополнительными фильмами в DOM
  render(filmsElement, new TopFilmsListComponent(), RenderPosition.BEFOREEND);

  // Добавление шаблона с дополнительными фильмами в DOM
  render(filmsElement, new CommentedFilmsListComponent(), RenderPosition.BEFOREEND);

  // Объявление контейнеров для добавление разметки
  const filmsExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);
  const filmsListTopRatedContainer = filmsExtraElement[0].querySelector(`.films-list__container`);
  const filmsListMostCommentedContainer = filmsExtraElement[1].querySelector(`.films-list__container`);

  // Добавление карточек с высоким рейтингом в DOM
  filmDetailsList.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
    renderMovieCard(filmsListTopRatedContainer, card);
  });

  // Добавление карточек с большим количеством комментарив в DOM
  filmDetailsList.slice(0, FILM_LIST_EXTRA_QUANTITY).forEach((card) => {
    renderMovieCard(filmsListMostCommentedContainer, card);
  });
};


export default class FilmsController {

  render(films) {
    renderMovies(films);
  }
}
