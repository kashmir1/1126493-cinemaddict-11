export const createFilmCard = () => {

  // Массив названий фильмов
  const filmTitles = [
    `Jocker`,
    `Hellraser`,
    `Rambo: first blood`,
    `Departed`,
    `Terminator`,
  ];

  // Массив постеров
  const filmPosters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  // Массив описаний
  const filmDescs = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  ];

  // Случайное число из диапазона
  const randomInt = (min, max) => {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  // Рандом
  const getRandom = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  // создаем пустой массив описаний
  const descriptions = [];

  // цикл для рандомной записи в новый массив
  const getRandomStr = (emptyArr, donor) => {
    for (let i = 0; i <= randomInt(1, 5); i++) {
      emptyArr.push(donor[randomInt(1, 5)]);
    }
  };

  getRandomStr(descriptions, filmDescs);

  // Создаем троку из элементов массива
  const description = descriptions.join(` `);

  const filmData = {
    title: filmTitles[getRandom(filmTitles)],
    poster: `./images/posters/` + filmPosters[getRandom(filmPosters)],
    description, // ключ совпадает со значенеим
    comment: {
      count: 4,
      emoji: `.public/images/emoji/angry.png`,
      author: `John Doe`,
      date: `2 days ago`
    }
  };

  return (
    ` <article class="film-card">
          <h3 class="film-card__title">${filmData.title}</h3>
          <p class="film-card__rating">8.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="${filmData.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${filmData.description}</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};
