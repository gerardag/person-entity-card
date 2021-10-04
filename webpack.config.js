const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/person-entity-card.js",
  output: {
    filename: "person-entity-card.js",
    path: path.resolve(__dirname, "./"),
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: "./person-entity-card.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: "commonjs",
                  targets: "> 5%, not dead",
                },
              ],
            ],
            plugins: [["@babel/plugin-transform-template-literals"]],
          },
        },
      },
      {
        test: /\.(png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
