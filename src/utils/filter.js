import {FilterType} from "../consts";

const getWatchlistMovies = (movies) => movies.filter((movie) => movie.watchlist);

const getWatchedMovies = (movies) => movies.filter((movie) => movie.alreadyWatched);

const getFavoriteMovies = (movies) => movies.filter((movie) => movie.favorite);

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getWatchedMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
    default:
      return movies;
  }
};
