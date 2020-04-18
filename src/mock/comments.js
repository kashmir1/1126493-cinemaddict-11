import {SMILES, COMMENT_TEXTS, AUTHORS} from "../consts";
import {getRandomItem} from "../utils";

const generateComment = () => {

  return {
    smile: `./images/emoji/` + getRandomItem(SMILES),
    commentText: getRandomItem(COMMENT_TEXTS),
    author: getRandomItem(AUTHORS),
    commentDate: new Date(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
