import {getRandomInteger, getRandomItems, getRandomArrayItem} from "../utils/common";

// Импортируем константы
import {MOVIE_TITLES, MOVIE_DESCS, MOVIE_POSTERS, RATES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES, AGE_RATES} from "../consts";
import {generateComments} from "./comments";

const MAX_ARR_ELEM = 5;

// Вызываем функцию массива описаний и сценаристов и вызываем метод join
const description = getRandomItems(MOVIE_DESCS, getRandomInteger(1, MAX_ARR_ELEM)).join(` `);
const writers = getRandomItems(WRITERS, getRandomInteger(1, MAX_ARR_ELEM)).join(`, `);
const movieName = getRandomArrayItem(MOVIE_TITLES);

const getGenre = () => {
  const currentGenres = GENRES.slice().filter(() => {
    return Math.random() > 0.5;
  });

  return currentGenres.slice(0, getRandomInteger(1, currentGenres.length - 1));
};

const generateMovie = () => {

  return {
    id: String(new Date() + Math.random()),
    title: movieName,
    poster: `./images/posters/` + getRandomArrayItem(MOVIE_POSTERS),
    originalName: movieName,
    rate: getRandomArrayItem(RATES),
    year: new Date(),
    director: getRandomArrayItem(DIRECTORS),
    writers,
    actors: getRandomArrayItem(ACTORS),
    dateRelease: new Date(),
    runtime: new Date(),
    country: getRandomArrayItem(COUNTRIES),
    description,
    genres: getGenre(),
    ageRate: getRandomArrayItem(AGE_RATES),
    comments: generateComments(getRandomInteger(1, 5)),
  };
};

const generateMovies = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovie);
};

export {generateMovies};

