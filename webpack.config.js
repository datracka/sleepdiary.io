// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require("webpack");

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function makeWebpackConfig() {

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  config.devtool = 'cheap-module-eval-source-map';

  // add debug messages
  config.debug = true;

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry =  {
    'main': './src/main.ts' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  };

  config.devserver  = {
    historyApiFallback: true,
    stats: 'minimal'
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    loaders: [
      {
        test: /\.ts?$/, 
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"},
      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw'}
    ]
  }

  config.resolve = {
    extensions: ['', '.js', '.ts']
  }

  config.plugins = [

    new webpack.DefinePlugin({
      ENV: require(path.join(__dirname, './config/', 'environment.dev.ts'))
    }),

/*    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3100/dist/', //BS act as a proxy for webpack-de-server
      //server: { baseDir: ['./app'] }
    }),*/

    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunksSortMode: packageSort(['polyfills', 'vendor', 'app'])
    }),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: root('/src/index.html'),
      to: root('/dist')
    }])

  ];

  /**
   * Apply the tslint loader as pre/postLoader
   * Reference: https://github.com/wbuchwalter/tslint-loader
   */
  config.tslint = {
    emitErrors: false,
    failOnHint: false
  };

  return config;

}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'app']
  var len = packages.length - 1;
  var first = packages[0];
  var last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
    // vendor before app
    if (a.names[0] !== first && b.names[0] === last) {
      return -1;
    } else {
      return 1;
    }
  }
}
