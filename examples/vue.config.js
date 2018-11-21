
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'transform-helper': path.resolve(__dirname, '../src/TransformHelper.js')
      }
    }
  }
}