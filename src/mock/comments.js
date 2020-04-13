import {smiles, commentText, commentator} from "../consts";
import {getRandom} from "../utils";

const generateComment = () => {

  // Создаем cтроку из элементов массива
  return {
    smile: `./images/emoji/` + smiles[getRandom(smiles)],
    commentText: commentText[getRandom(commentText)],
    commentator: commentator[getRandom(commentator)],
    commentDate: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
