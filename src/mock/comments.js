import {SMILES, COMMENT_TEXTS, AUTHORS} from "../consts";
import {getRandomItem, randomInt} from "../utils";

const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 5;

const generateComment = () => {

  return [{
    commentCount: randomInt(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
    smile: `./images/emoji/` + getRandomItem(SMILES),
    commentText: getRandomItem(COMMENT_TEXTS),
    author: getRandomItem(AUTHORS),
    commentDate: new Date(),
  }];
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
