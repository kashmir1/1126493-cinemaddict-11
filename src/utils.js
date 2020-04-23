export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const getRandomInteger = (min, max) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
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

// Если значение < 10, добавляем 0
const createPadString = (value, len) => {
  return String(value).padStart(len, `0`);
};

export const getFormatTime = (date) => {
  const isDateShowing = !!date;
  const hours = createPadString(date.getHours() % 12, 2);
  const minutes = createPadString(date.getMinutes(), 2);
  return isDateShowing ? `${hours}:${minutes}` : ``;
};

// Приведение даты к строке
export const getDateIntegerFormat = (dateObj) => {
  const isDateShowing = !!dateObj;
  return isDateShowing ? `${dateObj.getFullYear()}/${createPadString(dateObj.getMonth() + 1, 2, 0)}/${dateObj.getDate()} ` : ``;
};

export const getDate = (dateObj, monthsArray) => {
  const isDateShowing = !!dateObj;
  return isDateShowing ? `${dateObj.getDate()} ${getRandomArrayItem(monthsArray)} ${dateObj.getFullYear()}` : ``;
};

export const getTime = (timeObj) => {
  return `${timeObj.getHours() + `h`} ${timeObj.getMinutes() + `m`}`;
};


// Slug
export const createSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ``);

  str = str.toLowerCase();

  const from = `ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;`;
  const to = `AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------`;
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), `g`), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, ``)
    .replace(/\s+/g, `-`)
    .replace(/-+/g, `-`);

  return str;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
