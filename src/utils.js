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
export const getRandomStr = (donor, len) => {
  const emptyArr = [];
  for (let i = 0; i <= randomInt(1, len); i++) {
    const randomIndex = randomInt(0, donor.length - 1);
    emptyArr.push(donor[randomIndex]);
  }
  return emptyArr;
};


// Время и дата
export const writeTimeFormat = (value, len, string) => {
  return String(value).padStart(len, string);
}; // Если значение < 10, добавляем 0

export const formatTime = (date) => {
  const hours = writeTimeFormat(date.getHours() % 12);
  const minutes = writeTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

