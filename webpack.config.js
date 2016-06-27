var webpack = require("webpack");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: {
    main: "./src/main.ts", //main app entry point
  },
  output: {
    //filename: './app/js/bundle.js'
    path: __dirname,
    filename: "./app/js/bundle.js"
  },
  resolve: {
    extensions: ['' , '.js' , '.ts']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.ts?$/, loader: 'ts-loader' , exclude: /node_modules/ },
      {test: /\.html$/, loader: 'html'}
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3100/app/', //BS act as a proxy for webpack-de-server
      //server: { baseDir: ['./app'] }
    })
  ]
}
