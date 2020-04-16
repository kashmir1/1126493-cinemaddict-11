import {randomInt, getRandomStr, getRandomItem} from "../utils";

// Импортируем константы
import {FILM_TITLES, FILM_DESCS, FILM_POSTERS} from "../consts";

const MIN_SENTENCE_QTY = 1;
const MAX_SENTENCE_QTY = 5;
const MAX_ARR_ELEM = 5;

// Вызываем функцию массива описаний и вызываем метод joun
const descriptions = getRandomStr(FILM_DESCS, MAX_ARR_ELEM);
const description = descriptions.join(` `);

const generateFilm = () => {

  // Создаем cтроку из элементов массива
  return {
    title: getRandomItem(FILM_TITLES),
    poster: `./images/posters/` + getRandomItem(FILM_POSTERS),
    originalName: getRandomItem(FILM_TITLES),
    rate: `8.9`,
    director: `Peter Jackson`,
    writers: `J.R.R. Tolkien (novel), Fran Walsh`,
    actors: ` Elijah Wood, Ian McKellen, Orlando Bloom`,
    dateRelease: `01 March 2002`,
    runtime: `1h 36m`,
    country: `USA`,
    description, // ключ совпадает со значенеим
    year: 1929,
    duration: `1h 55m`,
    genres: `Comedy`,
    agesRate: `12+`,
    commentCount: randomInt(MIN_SENTENCE_QTY, MAX_SENTENCE_QTY),
  };
};

const generateFilmsDetail = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilmsDetail};

