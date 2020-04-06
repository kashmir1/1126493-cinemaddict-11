const path = require('path');

module.exports = {
  mode: 'development', // режим сборки
  entry: './src/main.js', // точка входа
  output: {
    filename: 'bundle.js', // файл сборки
    path: path.join(__dirname, 'public'), // директория
  },
  devtool: 'source-map', // активация генерации source-maps
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // Автоматическая перезагрузка страницы
    // По умолчанию приложение будет доступно по адресу http: //localhost:8080
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    watchContentBase: true,
  }
};
