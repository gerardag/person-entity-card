const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "person-entity-card-bundle.js",
  },
  optimization: {
    minimize: true,
  },
};