module.exports = {
	include: ['./src'],
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		['@babel/preset-typescript'],
		['@babel/preset-react'],
	],
	plugins: [
		['@babel/plugin-proposal-class-properties'],
		[
			'module-resolver',
			{
				alias: {
					'@app': './src/app',
					'@components': './src/components',
					'@navigation': './src/navigation/navigation',
					'@rnweb': './src/lib/rnweb-light',
					'@screens': './src/screens',
					'@images': './src/assets/images',
					'@state': './src/state/state',
					'@logger': './src/lib/logger',
					'@lib': './src/lib',
					'@config': './src/config',
					storage: './src/utils/storage',
					'react-native': './src/lib/react-native-layer',
					'react-native-gesture-handler': './src/lib/react-native-gesture-handler',
					'react-content-loader/native': './src/lib/react-content-loader',
					'rnweb-light': './src/lib/react-native-layer',
					'react-native-modal': './src/lib/react-native-modal',
					'react-native-webview': './src/lib/react-native-layer',
					'react-native-udp': './src/lib/react-native-udp',
					localization: './src/lib/react-native-localize-layer',
					'react-native-linear-gradient': './src/lib/react-native-linear-gradient-layer',
					languages: '../game/src/data/languages',
				},
			},
		],
		['jest-hoist'],
	],
}
