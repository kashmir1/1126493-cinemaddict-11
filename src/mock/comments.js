export const generateComment = () => {

  // Создаем cтроку из элементов массива
  return {

  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
