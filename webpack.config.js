const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isDev = process.env.APP_ENV === 'development';

const baseFilename = isDev ? 'main' : 'main.[contenthash]';

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'js', 'main.js'),
    path.resolve(__dirname, 'src', 'css', 'main.css'),
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: `${baseFilename}.js`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new WebpackManifestPlugin({ publicPath: '/assets/' }),
    new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
  ],
};
