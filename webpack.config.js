'use strict';
let path = require('path');
let dotEnvPlugin = require('webpack-dotenv-plugin');

module.exports = {

  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':       './src/main.browser.ts',
  },

  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader']},
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        exclude: [/\.global\.scss$/],
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.global\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.ts', '.js']
  },

  plugins: [
      new dotEnvPlugin({ sample: './.env.default', path: './.env.dev' })
  ],

  devtool: false,
}