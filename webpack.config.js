const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {

  const rules = [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {presets: ['es2015']}
      }
    }
  ];

  env.dev
    ? rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?sourceMap',
        'sass-loader?sourceMap',
      ]
    })
    : rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    });

  const plugins = [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    })
  ];

  if (env.prod) {
    plugins.push(new ExtractTextPlugin({filename: '[name].bundle.css', disable: false, allChunks: true}))
  }

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
      rules: rules
    },
    plugins: plugins
  }
}
;
