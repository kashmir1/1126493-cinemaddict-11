import {FilterType} from "../consts";

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.watchlist);
};

export const getWatchedMovies = (movies) => {
  return movies.filter((movie) => !movie.alreadyWatched);
};

export const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.favorite);
};

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
