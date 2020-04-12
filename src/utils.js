// Случайное число из диапазона
export const randomInt = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Рандом
export const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

// цикл для рандомной записи в новый массив
export const getRandomStr = (emptyArr, donor) => {
  for (let i = 0; i <= randomInt(1, 5); i++) {
    emptyArr.push(donor[randomInt(1, 5)]);
  }
};
