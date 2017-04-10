var fs = require('fs')
var path = require('path')
var paths = require('./paths');

module.exports = {

  entry: paths.serverSrc,

  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    filename: 'server.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: 'eslint-loader',
        include: paths.appSrc
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.css|sass$/,
        use: 'ignore-loader'
      }
    ]
  },

  watch: true
}
