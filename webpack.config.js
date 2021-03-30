var path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',
	output: {
		path: path.resolve('build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				  // Creates `style` nodes from JS strings
				  "style-loader",
				  // Translates CSS into CommonJS
				  "css-loader",
				  // Compiles Sass to CSS
				  "sass-loader",
				],
			  },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
		],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	externals: {
		react: 'react',
	},
};
