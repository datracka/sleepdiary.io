var path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var DotenvPlugin = require('webpack-dotenv-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = process.env.npm_lifecycle_event;
console.log("prod!! ENV " + ENV);
// Webpack Config

var webpackConfig = {
  mode: 'production',
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor': './src/vendor.browser.ts',
    'main': './src/main.browser.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist_prod')
  },
  plugins: [
    new UglifyJSPlugin({
      mangle: true,
      compress: false
    })
  ],

  module: {
    exprContextCritical: false, //used for removing warning "Critical dependency: the request of a dependency is an expression"
    rules: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
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
