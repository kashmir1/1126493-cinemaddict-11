import moment from "moment";

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
  } else if (watchedMoviesCount <= 10) {
    return `Novice`;
  } else if (watchedMoviesCount > 10 && watchedMoviesCount <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};
