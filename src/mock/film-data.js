import {randomInt, getRandomStr, getRandom} from "../utils";

// Импортируем константы
import {filmTitles, filmDescs, filmPosters} from "../consts";


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
    commentCount: randomInt(1, 5),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};

