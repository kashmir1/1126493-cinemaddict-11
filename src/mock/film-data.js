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
    description, // ключ совпадает со значенеим
    rate: `8.9`,
    year: 1929,
    duration: `1h 55m`,
    genres: `Comedy`,
    commentCount: randomInt(MIN_SENTENCE_QTY, MAX_SENTENCE_QTY),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};

