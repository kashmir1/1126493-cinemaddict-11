export default class Movies {
  constructor() {
    this._movies = [];

    // хранилище хендлеров которые реагируют на изменение данных
    this._dataChangeHandlers = [];
  }

  // метод получения фильмов
  getMovies() {
    return this._movies;
  }

  // метод заполнения данными
  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  // метод обновления одного фильма
  updateMovies(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandelrs(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
