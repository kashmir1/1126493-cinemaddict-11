const MOVIE_CARD_QUANTITY = 15;

import UserRankComponent from "./components/rank";
import NavigationComponent from "./components/navigation";
import SortListComponent from "./components/sort";
import FilmsListComponent from "./components/film-list";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";

// Моки
import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

const films = generateFilms(MOVIE_CARD_QUANTITY);
const filters = generateFilters();

render(headerElem, new UserRankComponent(), RenderPosition.BEFOREEND);
render(mainElem, new NavigationComponent(filters), RenderPosition.BEFOREEND);
render(mainElem, new SortListComponent(), RenderPosition.BEFOREEND);
render(mainElem, new FilmsListComponent(), RenderPosition.BEFOREEND);

// Объявление контейнеров для добавление разметки
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const pageController = new PageController(mainElem);

// Добавление блока статистика в DOM
render(footerStatisticsElement, new FooterStatisticsComponent(films.length), RenderPosition.BEFOREEND);
pageController.render(films);


