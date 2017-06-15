const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

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
  externals: [
    {
      pg: true
    }
  ],
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

  resolve: {
    alias: {
      // Because we're in Node environment, use raven, not raven-js
      'raven-js': 'raven'
    }
  },

  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
  ],

  watch: true
}
