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
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true,
			},
		],
		['@babel/plugin-proposal-class-properties'],
		[
			'module-resolver',
			{
				alias: {
					'@components': './src/components',
					'@navigation': './src/navigation/navigation',
					'@rnweb': './src/lib/rnweb-light',
					'@screens': './src/screens',
					'@state': './src/state/state',
					'@logger': './src/lib/logger',
					lib: './src/lib',
					App: './src',
					config: './config',
					webStyles: './src/style/',
					storage: './src/utils/storage',
					'react-native': './src/lib/react-native-layer',
					'react-native-gesture-handler': './src/lib/react-native-gesture-handler',
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
