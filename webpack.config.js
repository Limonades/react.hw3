const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: './dev/index.js',
	output: {
		path: path.resolve(__dirname, 'prod'),
		filename: 'bundle.js'
	},
	watch: NODE_ENV === 'development',
	devtool: NODE_ENV === 'development' && 'eval-source-map',
	mode: NODE_ENV,
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react'],
					}
				}	
			}
		] 
	}
};