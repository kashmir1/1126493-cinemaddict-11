import {RenderPosition} from "./utils";
import {render} from "./utils";

const MOVIE_CARD_QUANTITY = 15;
const FILM_LIST_EXTRA_QUANTITY = 2;
const FILM_DETAIL_QUANTITY = 1;
const SHOWING_FILM_COUNT_ON_START = 6;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

import UserRankComponent from "./components/rank";
import NavigationComponent from "./components/navigation";
import FilmsListComponent from "./components/film-list";
import FilmsListContainerComponent from "./components/film-list-container";
import FilmCardComponent from "./components/film-card";
import TopListComponent from "./components/top-list";
import CommentListComponent from "./components/comment-list";
import ShowMoreButtonComponent from "./components/show-more";
import FilmDetailComponent from "./components/film-detail";
import FooterStatisticsComponent from "./components/footer-statistics";

// Моки
import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";

const siteBody = document.querySelector(`body`);
const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const filmList = document.querySelector(`.films-list`);

const films = generateFilms(MOVIE_CARD_QUANTITY);
const filters = generateFilters();
const film = films[FILM_DETAIL_QUANTITY];

render(headerElem, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElem, new NavigationComponent(filters).getElement(), RenderPosition.BEFOREEND);

// render(siteBody, new FilmDetailComponent(film).getElement(), RenderPosition.BEFOREEND);


///////
const renderFilmCards = () => {
  render(mainElem, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmList, new FilmsListContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsListContainer = filmList.querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;

  films.slice(1, showingFilmsCount)
    .forEach((films) => render(filmsListContainer, new FilmCardComponent(films), RenderPosition.BEFOREEND));
};


renderFilmCards();
