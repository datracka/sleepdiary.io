var webpack = require('webpack');
var path = require('path');

var DotenvPlugin = require('webpack-dotenv-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/** postcss plugins */
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = process.env.npm_lifecycle_event;
console.log("ENV " + ENV);
// Webpack Config

var webpackConfig = {

  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':       './src/main.browser.ts',
  },

  output: {
    path: './dist'
  },

  plugins: [],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader'] },
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
  postcss: function () {
    return [precss, autoprefixer];
  }

};

/** plugins **/

webpackConfig.plugins.push(new DotenvPlugin({ sample: './.env.default', path: './.env.prod' }))
if (ENV !== 'test') { //when test don't want add this plugin
  webpackConfig.plugins.push(new BrowserSyncPlugin({ host: 'localhost', port: 3000, proxy: 'http://localhost:3100'}));
}

// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);