import UserRankComponent from "./components/rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import MovieListComponent from './components/movies-list';
import MovieCounterComponent from './components/movie-counter.js';
import PageController from "./controllers/page";
import MoviesModel from './models/movies.js';
import FilterController from "./controllers/filter";
import StatisticsComponent from './components/statistics.js';
import MovieListPreloaderComponent from "./components/movie-list-preloader";
import API from './api.js';

import {render, replace} from "./utils/render";
const AUTHORIZATION = `Basic 21337`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const filterController = new FilterController(siteMainElement, moviesModel, () => {
  statisticsComponent.hide();
  pageController.show();
});
filterController.render();

const movieListComponent = new MovieListComponent();
const pageController = new PageController(movieListComponent, moviesModel, api);
render(siteMainElement, movieListComponent);
pageController.render();

const statisticsComponent = new StatisticsComponent(moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched));
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

filterController.setOnStatsClick(() => {
  pageController.hide();
  statisticsComponent.show(moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched));
});

const movieCounterComponent = new MovieCounterComponent();
render(footerStatisticsElement, movieCounterComponent);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);

    const moviesCount = moviesModel.getAllMovies().length;
    const watchedMovies = moviesModel.getAllMovies().filter(({userDetails: {alreadyWatched}}) => alreadyWatched);
    render(siteHeaderElement, new UserRankComponent(watchedMovies.length));

    filterController.render();

    movieListComponent.onMoviesLoad(moviesCount);
    pageController.render();

    replace(movieCounterComponent, new MovieCounterComponent(moviesCount));
  })
  .catch(() => {
    const moviesCount = moviesModel.getAllMovies().length;
    movieListComponent.onMoviesLoad(moviesCount);
    pageController.render();
  });
