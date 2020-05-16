import {SMILES, COMMENT_TEXTS, AUTHORS} from "../consts";
import {getRandomArrayItem} from "../utils/common";

const generateComment = () => {

  return {
    id: String(new Date() + Math.random()),
    smile: `./images/emoji/` + getRandomArrayItem(SMILES),
    commentText: getRandomArrayItem(COMMENT_TEXTS),
    author: getRandomArrayItem(AUTHORS),
    commentDate: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
