const path = require('path');

module.exports = {
  mode: 'development', // режим сборки
  entry: './src/main.js', // точка входа
  output: {
    filename: 'bundle.js', // файл сборки
    path: path.join(__dirname, 'public'), // директория
  },
  devtool: 'source-map', // активация генерации source-maps
};
