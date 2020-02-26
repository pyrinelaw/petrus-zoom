var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = __dirname;
var DEV_PATH = path.resolve(ROOT_PATH, 'dev');
var DEMO_PATH = path.resolve(ROOT_PATH, 'demo');

module.exports = {
	entry: {
		 index: path.resolve(DEV_PATH, 'index.js')
    },

	output: {
		path: DEMO_PATH,
	    filename: 'index.js',	// 默认输出
	},
	resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css', 'es6']
	},
	devtool: 'eval-source-map',
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new HtmlwebpackPlugin({
          	template: path.resolve(DEV_PATH, 'index.html'),
          	filename: 'index.html',
          	chunks: ['index'],
          	inject: 'body'
        })
  	],
  	module: {
	    loaders: [
	      	{
		        test: /\.(jsx|js)?$/,
				loaders: ['babel'],
				options: {
					plugins: ['transform-es2015-modules-commonjs'],
				},
			},
			{
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
	    ]
	}
}