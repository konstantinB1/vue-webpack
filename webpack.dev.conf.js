const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const { argv } = require('yargs')
const port = argv.port || 8080
const host = argv.host || 'localhost'

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
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
    host,
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
    new DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      onErrors: () => {
        const notifier = require('node-notifier')
    
        return (severity, errors) => {
          if (severity !== 'error') return
      
          const error = errors[0]
          const filename = error.file && error.file.split('!').pop()
      
          notifier.notify({
            title: 'There was an error',
            message: severity + ': ' + error.name,
            subtitle: filename || ''
          })
        }
      },
      compilationSuccessInfo: {
        messages: [
          `Serving content from http://${host}:${port}`
        ]
      }
    })
  ]
})