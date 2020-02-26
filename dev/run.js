/**
 * 添加一点描述吧
 * @authors Petrus.Law (petrus.law@outlook.com)
 * @date    2016-09-12 10:14:12
 * @version 0.01
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.dev.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(1333, 'localhost', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at localhost:1333');
  }
});