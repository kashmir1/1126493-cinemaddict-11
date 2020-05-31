import moment from "moment";

const userRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const watchedMoviesQuantity = {
  AVERAGE_AMOUNT: 10,
  MAX_AMOUNT: 20,
};

export const getFormatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const getDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getYear = (date) => {
  return moment(date).year();
};

export const formatRuntime = (runtime) => {
  const hours = moment.duration(runtime, `minutes`).hours();
  const minutes = moment.duration(runtime, `minutes`).minutes();

  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatRank = (watchedMoviesCount) => {
  if (!watchedMoviesCount) {
    return ``;
  } else if (watchedMoviesCount <= watchedMoviesQuantity.AVERAGE_AMOUNT) {
    return userRank.NOVICE;
  } else if (watchedMoviesCount > watchedMoviesCount.AVERAGE_AMOUNT && watchedMoviesCount <= watchedMoviesCount.MAX_AMOUNT) {
    return userRank.FAN;
  } else {
    return userRank.MOVIE_BUFF;
  }
};
