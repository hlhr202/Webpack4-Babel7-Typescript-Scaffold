const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const timeStamp = new Date().getTime()

module.exports = {
	entry: {
		bundle: './js/index.tsx'
	},
	output: {
		filename: `assets/${timeStamp}/js/[name].js`,
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	mode: 'development',
	context: path.resolve(__dirname, 'src'),
	watch: false,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: ['babel-loader']
			}
		]
	},
	devServer: {
		host: '0.0.0.0',
		port: 3200,
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		headers: {
			'Service-Worker-Allowed': '/'
		},
		historyApiFallback: {
			rewrites: [
				{from: /^\/$/, to: '/dist/index.html'},
				{from: /./, to: '/dist/index.html'}
			]
		},
		inline: true,
		watchOptions: {
			watch: true
		},
		disableHostCheck: true,
		compress: true
	},
	plugins: [
		new HTMLPlugin({
			title: 'Hello',
			template: path.resolve(__dirname, 'src/index.ejs')
		}),
		new OfflinePlugin({
			AppCache: false,
			appShell: '/',
			ServiceWorker: {
                minify: false,
				events: true,
				output: 'assets/sw.js',
				publicPath: '/dist/assets/sw.js',
				scope: '/'
			},
			caches: {
				main: [
					`assets/${timeStamp}/js/vendor.js`,
					`assets/${timeStamp}/js/bundle.js`
				],
				//additional: [`assets/${timeStamp}/static/*.png`]
			},
			externals: ['/'],
			autoUpdate: 1000 * 60 * 60 * 24,
			safeToUseOptionalCaches: true
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: path.resolve(__dirname, 'node_modules'),
					name: 'vendor',
					enforce: true
				}
			}
		}
	},
	stats: 'none'
}
