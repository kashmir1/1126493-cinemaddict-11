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

const MIN_ARR_VALUE = 1;
const MAX_ARR_VALUE = 5;

// цикл для рандомной записи в новый массив
export const getRandomStr = (emptyArr, donor) => {
  for (let i = 0; i <= donor.left; i++) {
    donor.length = randomInt(MIN_ARR_VALUE, MAX_ARR_VALUE);
    emptyArr.push(donor.length);
  }
};

const TARGET_LENGTH = 2;
const FILL_STRING = `2`;

// Время и дата
export const commentWriteTimeFormat = (value) => {
  return String(value).padStart(TARGET_LENGTH, FILL_STRING);
}; // Если значение < 10, добавляем 0

export const formatTime = (date) => {
  const hours = commentWriteTimeFormat(date.getHours() % 12);
  const minutes = commentWriteTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

