const MOVIE_CARD_QUANTITY = 15;

import UserRankComponent from "./components/rank";
import NavigationComponent from "./components/navigation";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import MoviesModel from './models/movies.js';

// Моки
import {generateMovies} from "./mock/film";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);

const movies = generateMovies(MOVIE_CARD_QUANTITY);
const filters = generateFilters();
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

render(headerElem, new UserRankComponent(), RenderPosition.BEFOREEND);
render(mainElem, new NavigationComponent(filters), RenderPosition.AFTERBEGIN);

// Объявление контейнеров для добавление разметки
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const pageController = new PageController(mainElem, moviesModel);

// Добавление блока статистика в DOM
render(footerStatisticsElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFOREEND);
pageController.render(movies);


