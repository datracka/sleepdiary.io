var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var DotenvPlugin = require('webpack-dotenv-plugin');

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
    path: path.resolve(__dirname, 'dist_prod')
  },
  plugins: [
    new UglifyJSPlugin()
  ],

  module: {
    rules: [
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
  }
};

/** plugins **/

webpackConfig.plugins.push(new DotenvPlugin({ sample: './.env.default', path: './.env.prod' }))

// Our Webpack Defaults
var defaultConfig = {

  cache: false,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      "node_modules"
    ],
    extensions: ['.ts', '.js']
  },

  node: {
    global: true,
    Buffer: false,
    setImmediate: false
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
