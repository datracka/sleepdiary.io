let path = require('path');

let DotenvPlugin = require('webpack-dotenv-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let _ref  = require('awesome-typescript-loader');

/** postcss plugins */
let precss       = require('precss');
let autoprefixer = require('autoprefixer');

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
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [],

  module: {
    exprContextCritical: false, //used for removing warning "Critical dependency: the request of a dependency is an expression"
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

webpackConfig.plugins.push(new _ref.CheckerPlugin());
webpackConfig.plugins.push(new DotenvPlugin({ sample: './.env.default', path: './.env.dev' }))
if (ENV !== 'test') { //when test don't want add this plugin
  webpackConfig.plugins.push(new BrowserSyncPlugin({ host: 'localhost', port: 9001, proxy: 'http://localhost:9000'}));
}

// Our Webpack Defaults
let defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
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

  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 9000,
    proxy: {
      '/api/1': {
        target: 'http://localhost:8000',
        secure: false,
      }
    }
  },

  node: {
    global: true,
    Buffer: false,
    setImmediate: false
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
