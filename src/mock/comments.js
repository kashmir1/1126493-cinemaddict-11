import {filmPosters, filmTitles} from "../consts";
import {getRandom, randomInt} from "../utils";

const generateComment = () => {

  // Создаем cтроку из элементов массива
  return {
    title: filmTitles[getRandom(filmTitles)],
    poster: `./images/posters/` + filmPosters[getRandom(filmPosters)],
    description, // ключ совпадает со значенеим
    commentCount: randomInt(1, 5),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
