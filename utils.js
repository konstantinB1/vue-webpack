'use strict'
const path = require('path')
const config = require('./config')

exports.assetsPath = function (_path, assetsSubDirectory) {
  assetsSubDirectory
    = typeof assetsSubDirectory === 'undefined'
    ? 'static'
    : assetsSubDirectory
  const assetsSub = process.env.NODE_ENV === 'production'
    ? assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSub, _path)
}

