var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: path.join(__dirname, './chrome/js/background.js'),
    browser: path.join(__dirname, './chrome/js/browser.js'),
    content: path.join(__dirname, './chrome/js/content.js'),
    devtools_panel: path.join(__dirname, './chrome/js/devtools_panel.js'),
    devtools: path.join(__dirname, './chrome/js/devtools.js'),
    options: path.join(__dirname, './chrome/js/options.js'),
    inject: path.join(__dirname, './chrome/js/inject.js'),
    popup: path.join(__dirname, './chrome/js/popup.js'),
    window: path.join(__dirname, './chrome/js/window.js'),
  },
  output: {
    path: path.join(__dirname, './dev/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      ['_locales', 'images', 'pages', 'manifest.json'].map(dir => {
        return {
          from: path.join(__dirname, './chrome/' + dir),
          to: path.join(__dirname, './dev/' + dir),
          ignore: ['.*']
        };
      })
    )
  ],
  devtool: '#cheap-module-eval-source-map'
};
