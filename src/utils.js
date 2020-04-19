export const getRandomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Рандом
export const getRandomArrayItem = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

// цикл для рандомной записи в новый массив
export const getRandomItems = (array, len) => {
  const emptyArr = [];
  for (let i = 0; i <= getRandomInteger(1, len); i++) {
    const randomIndex = getRandomInteger(0, array.length - 1);
    emptyArr.push(array[randomIndex]);
  }
  return emptyArr;
};

const createPadString = (value, len, string) => {
  return String(value).padStart(len, string);
}; // Если значение < 10, добавляем 0

export const getFormatTime = (date) => {
  const hours = createPadString(date.getHours() % 12);
  const minutes = createPadString(date.getMinutes());
  return `${hours}:${minutes}`;
};

// Приведение даты к строке
export const getDateIntegerFormat = (dateObj) => {
  const isDateShowing = !!dateObj;
  return isDateShowing ? `${dateObj.getFullYear()}/${createPadString(dateObj.getMonth() + 1, 2, 0)}/${dateObj.getDate()} ` : ``;
};

export const getDate = (dateObj, monthsArray) => {
  dateObj = new Date(getRandomInteger(1900, 2000), 0, getRandomInteger(1, 31));
  return `${dateObj.getDate()} ${createPadString(getRandomArrayItem(monthsArray))} ${dateObj.getFullYear()}`;
};

export const getTime = (timeObj) => {
  timeObj = new Date(0, 0, 0, getRandomInteger(0, 4), getRandomInteger(0, 60));
  return `${timeObj.getHours() + `h`} ${timeObj.getMinutes() + `m`}`;
};
