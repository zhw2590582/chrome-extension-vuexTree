var path = require('path');
var fs = require('fs-extra');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var isProd = process.env.NODE_ENV === 'prod';
let webpackConfig = {
  entry: {
    test: './chrome/test.js',
    test2: './chrome/test2.js'
  },
  output: {
    path: path.join(__dirname, isProd ? './build/js' : './dev/js'),
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
      ['img', 'img2', 'test3.js'].map(dir => {
        return {
          from: path.join(__dirname, './chrome/' + dir),
          to: path.join(__dirname, isProd ? './build/' + dir : './dev/' + dir),
          ignore: ['.*']
        };
      })
    )
  ],
  devtool: isProd ? false : '#cheap-module-eval-source-map'
};

isProd && webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

module.exports = webpackConfig;
