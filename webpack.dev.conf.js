const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const { argv } = require('yargs')
const port = argv.port || 8080

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true }}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true }},
          { loader: 'resolve-url-loader', options: { sourceMap: true }},
          {
            loader: 'sass-loader',
            options: { sourceMap: true, }
          }
        ]
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    inline: true,
    port,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})