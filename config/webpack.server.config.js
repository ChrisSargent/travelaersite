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

  // keep node_module paths out of the bundle
  // externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
  //   'react-dom/server', 'react/addons',
  // ]).reduce(function (ext, mod) {
  //   ext[mod] = 'commonjs ' + mod
  //   return ext
  // }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css|sass$/, loader: 'ignore-loader' }
    ]
  },

  watch: true
}
