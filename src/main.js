const MOVIE_CARD_QUANTITY = 15;

import UserRankComponent from "./components/rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import MoviesModel from './models/movies.js';
import FilterController from "./controllers/filter";
import StatisticsComponent from './components/statistics.js';
import API from './api.js';

import {render, RenderPosition} from "./utils/render";
const AUTHORIZATION = `Basic 21337`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);


api.getMovies()
  .then((movies) => {
    const watchedMovies = movies.filter(({userDetails: {alreadyWatched}}) => alreadyWatched);
    moviesModel.setMovies(movies);
    render(headerElem, new UserRankComponent(watchedMovies.length), RenderPosition.BEFOREEND);

    const filterController = new FilterController(mainElem, moviesModel, () => {
      statisticsComponent.hide();
      pageController.show();
    });
    filterController.render();

    const footerElement = document.querySelector(`.footer`);
    const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
    const pageController = new PageController(mainElem, moviesModel, api);


    render(footerStatisticsElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFOREEND);
    pageController.render(movies);

    const statisticsComponent = new StatisticsComponent(watchedMovies);
    render(mainElem, statisticsComponent, RenderPosition.BEFOREEND);
    statisticsComponent.hide();

    filterController.setOnStatsClick(() => {
      pageController.hide();
      statisticsComponent.show(moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched));
    });
  });
