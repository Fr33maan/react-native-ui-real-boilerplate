// https://medium.com/@dandobusiness/setting-up-a-react-typescript-storybook-project-5e4e9f540568
// https://medium.com/@dandobusiness/improving-your-storybook-with-storybook-addons-717677e89de7

module.exports = {
	webpackFinal: (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [{
				loader: require.resolve('babel-loader'),
				options: {
					presets: [
						['react-app', {
							flow: false,
							typescript: true
						}]
					],
				},
			}, ],
		})
		config.resolve.extensions.push('.ts', '.tsx')
		return config
	},
	addons: ['@storybook/preset-scss'],
	stories: ['../src/**/*.stories.[tj]s(x)?'],
}