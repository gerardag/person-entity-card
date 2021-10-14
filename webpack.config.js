const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "dist/person-entity-card-bundle.js",
    path: path.resolve(__dirname, "./"),
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
  },
};