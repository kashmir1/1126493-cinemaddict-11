import UserRankComponent from "./components/rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import MoviesModel from './models/movies.js';
import FilterController from "./controllers/filter";
import StatisticsComponent from './components/statistics.js';
import MovieListPreloaderComponent from "./components/movie-list-preloader";
import API from './api.js';

import {render, remove, RenderPosition} from "./utils/render";
const AUTHORIZATION = `Basic 21337`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);


const filterController = new FilterController(mainElem, moviesModel, () => {
  statisticsComponent.hide();
  pageController.show();
});
filterController.render();

const statisticsComponent = new StatisticsComponent(moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched));
render(mainElem, statisticsComponent);
statisticsComponent.hide();

const movieListPreloaderComponent = new MovieListPreloaderComponent();
render(mainElem, movieListPreloaderComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(mainElem, moviesModel, api);
pageController.render();

filterController.setOnStatsClick(() => {
  pageController.hide();
  statisticsComponent.show(moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched));
});

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);

    const watchedMovies = moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched);
    render(headerElem, new UserRankComponent(watchedMovies.length));

    const footerElement = document.querySelector(`.footer`);
    const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
    filterController.render();

    remove(movieListPreloaderComponent);
    pageController.render();
    render(footerStatisticsElement, new FooterStatisticsComponent(moviesModel.getMovies().length), RenderPosition.BEFOREEND);
    render(mainElem, statisticsComponent, RenderPosition.BEFOREEND);
    statisticsComponent.hide();
  });
