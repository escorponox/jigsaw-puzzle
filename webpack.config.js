const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    context: path.resolve(__dirname, './app'),
    devtool: env.prod ? 'source-map' : 'eval',
    entry: {
      app: './scripts/app.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.resolve(__dirname, './dist/'),  // New
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: {
            loader: 'babel-loader',
            options: {presets: ['es2015']}
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
          ]
        }]
    },
    plugins: [
      new ExtractTextPlugin({filename: '[name].bundle.css', disable: false, allChunks: true}),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'commons',
      //   filename: 'commons.js',
      //   minChunks: 2,
      // })
      // new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      //
      new webpack.NamedModulesPlugin(),
    ]
  }
}
;
