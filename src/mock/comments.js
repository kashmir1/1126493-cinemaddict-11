import {smiles, commentText, commentator, filmComments} from "../consts";
import {getRandomItem} from "../utils";

const generateComment = () => {

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
