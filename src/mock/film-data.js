// Массив названий фильмов
// const filmTitles = [
//   `Jocker`,
//   `Hellraser`,
//   `Rambo: first blood`,
//   `Departed`,
//   `Terminator`,
// ];
//
// // Массив постеров
// const filmPosters = [
//   `made-for-each-other.png`,
//   `popeye-meets-sinbad.png`,
//   `sagebrush-trail.jpg`,
//   `santa-claus-conquers-the-martians.jpg`,
//   `the-dance-of-life.jpg`,
//   `the-great-flamarion.jpg`,
//   `the-man-with-the-golden-arm.jpg`,
// ];
//
// // Массив описаний
// const filmDescs = [
//   `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//   `Cras aliquet varius magna, non porta ligula feugiat eget.`,
//   `Fusce tristique felis at fermentum pharetra.`,
//   `Fusce tristique felis at fermentum pharetra.`,
//   `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
//   `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
//   `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
// ];
//
// // Случайное число из диапазона
// const randomInt = (min, max) => {
//   // случайное число от min до (max+1)
//   let rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// };
//
// // Рандом
// const getRandom = (arr) => {
//   return Math.floor(Math.random() * arr.length);
// };
//
// // создаем пустой массив описаний
// const descriptions = [];
//
// // цикл для рандомной записи в новый массив
// const getRandomStr = (emptyArr, donor) => {
//   for (let i = 0; i <= randomInt(1, 5); i++) {
//     emptyArr.push(donor[randomInt(1, 5)]);
//   }
// };
//
// const generateFilm = () => {
//   getRandomStr(descriptions, filmDescs);
//
//   // Создаем cтроку из элементов массива
//   const description = descriptions.join(` `);
//
//   return {
//     title: filmTitles[getRandom(filmTitles)],
//     poster: `./images/posters/` + filmPosters[getRandom(filmPosters)],
//     description, // ключ совпадает со значенеим
//     comment: {
//       count: 4,
//       emoji: `.public/images/emoji/angry.png`,
//       author: `John Doe`,
//       date: `2 days ago`
//     }
//   };
// };

const generateFilm = () => {
  return {};
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilm, generateFilms};

