import {SMILES, COMMENT_TEXTS, AUTHORS} from "../consts";
import {getRandomArrayItem} from "../utils/common";

const generateComment = () => {

  return {
    id: String(new Date() + Math.random()),
    emotion: getRandomArrayItem(SMILES),
    comment: getRandomArrayItem(COMMENT_TEXTS),
    author: getRandomArrayItem(AUTHORS),
    date: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
