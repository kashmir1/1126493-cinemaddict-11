import {smiles, commentText, commentator} from "../consts";
import {getRandomItem} from "../utils";

const generateComment = () => {

  // Создаем cтроку из элементов массива
  return {
    smile: `./images/emoji/` + getRandomItem(smiles),
    commentText: getRandomItem(commentText),
    commentator: getRandomItem(commentator),
    commentDate: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
