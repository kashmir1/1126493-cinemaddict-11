import {randomInt, getArrJoin, getRandomItem} from "../utils";

// Импортируем константы
import {
  FILM_TITLES,
  FILM_DESCS,
  FILM_POSTERS,
  RATE,
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRIES,
  GENRES, AGE_RATE, YEARS
} from "../consts";


const MIN_HOURS = 0;
const MAX_HOURS = 4;
const MIN_MINUTES = 0;
const MAX_MINUTES = 60;
const MAX_ARR_ELEM = 5;


// Вызываем функцию массива описаний и сценаристов и вызываем метод join
const descriptions = getArrJoin(FILM_DESCS, MAX_ARR_ELEM);
const description = descriptions.join(` `);
const writers = getArrJoin(WRITERS, MAX_ARR_ELEM);
const writer = writers.join(`, `);
const genres = getArrJoin(GENRES, MAX_ARR_ELEM);
const genre = genres.join(`, `);

const generateFilm = () => {

  return {
    title: getRandomItem(FILM_TITLES),
    poster: `./images/posters/` + getRandomItem(FILM_POSTERS),
    originalName: getRandomItem(FILM_TITLES),
    rate: getRandomItem(RATE),
    year: getRandomItem(YEARS),
    director: getRandomItem(DIRECTORS),
    writers: writer,
    actors: getRandomItem(ACTORS),
    dateRelease: new Date(),
    runtime: {
      hours: randomInt(MIN_HOURS, MAX_HOURS) + `h`,
      minutes: randomInt(MIN_MINUTES, MAX_MINUTES) + `m`,
    },
    country: getRandomItem(COUNTRIES),
    description, // ключ совпадает со значенеим
    genres: genre,
    agesRate: getRandomItem(AGE_RATE),
  };
};

const generateFilmsDetail = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilmsDetail};

