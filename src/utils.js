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

// Время и дата
export const commentWriteTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
}; // Если значение < 10, добавляем 0

export const formatTime = (date) => {
  const hours = commentWriteTimeFormat(date.getHours() % 12);
  const minutes = commentWriteTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
