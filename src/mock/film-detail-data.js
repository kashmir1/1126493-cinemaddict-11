import {randomInt, getRandomStr, getRandomItem} from "../utils";

// Импортируем константы
import {filmTitles, filmDescs, filmPosters} from "../consts";

const MIN_SENTENCE_QTY = 1;
const MAX_SENTENCE_QTY = 5;
const MAX_ARR_ELEM = 5;

// Вызываем функцию массива описаний и вызываем метод joun
const descriptions = getRandomStr(filmDescs, MAX_ARR_ELEM);
const description = descriptions.join(` `);

const generateFilm = () => {

  // Создаем cтроку из элементов массива
  return {
    title: getRandomItem(filmTitles),
    poster: `./images/posters/` + getRandomItem(filmPosters),
    originalName: getRandomItem(filmTitles),
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

