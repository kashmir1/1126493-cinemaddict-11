import {getRandomInteger, getRandomItems, getRandomArrayItem} from "../utils";

// Импортируем константы
import {FILM_TITLES, FILM_DESCS, FILM_POSTERS, RATES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES, AGE_RATE, YEARS} from "../consts";
import {generateComments} from "./comments";

const MAX_ARR_ELEM = 5;

// Вызываем функцию массива описаний и сценаристов и вызываем метод join
const description = getRandomItems(FILM_DESCS, getRandomInteger(1, MAX_ARR_ELEM)).join(` `);
const writers = getRandomItems(WRITERS, getRandomInteger(1, MAX_ARR_ELEM)).join(`, `);
const genres = getRandomItems(GENRES, getRandomInteger(1, MAX_ARR_ELEM)).join(` `);
const filmName = getRandomArrayItem(FILM_TITLES);

const generateFilm = () => {

  return {
    title: filmName,
    poster: `./images/posters/` + getRandomArrayItem(FILM_POSTERS),
    originalName: filmName,
    rate: getRandomArrayItem(RATES),
    year: getRandomArrayItem(YEARS),
    director: getRandomArrayItem(DIRECTORS),
    writers,
    actors: getRandomArrayItem(ACTORS),
    dateRelease: new Date(),
    runtime: new Date(),
    country: getRandomArrayItem(COUNTRIES),
    description,
    genres,
    ageRate: getRandomArrayItem(AGE_RATE), // s del
    comments: generateComments(getRandomInteger(1, 5)),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};

