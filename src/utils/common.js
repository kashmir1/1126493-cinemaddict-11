import moment from "moment";

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

export const getFormatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const getDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getYear = (date) => {
  return moment(date).year();
};

export const formatRuntime = (runtime) => {
  const hours = moment.duration(runtime, `minutes`).hours();
  const minutes = moment.duration(runtime, `minutes`).minutes();

  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
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
