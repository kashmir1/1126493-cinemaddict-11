import {randomInt, getRandomStr, getRandom} from "../utils";

// Импортируем константы
import {filmTitles, filmDescs, filmPosters} from "../consts";

const MIN_SENTENCE_QTY = 1;
const MAX_SENTENCE_QTY = 5;

// создаем пустой массив описаний
const descriptions = [];

// Вызываем функцию массива описаний и вызываем метод joun
getRandomStr(descriptions, filmDescs);
const description = descriptions.join(` `);

const generateFilm = () => {

  // Создаем cтроку из элементов массива
  return {
    title: filmTitles[getRandom(filmTitles)],
    poster: `./images/posters/` + filmPosters[getRandom(filmPosters)],
    description, // ключ совпадает со значенеим
    commentCount: randomInt(MIN_SENTENCE_QTY, MAX_SENTENCE_QTY),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};

