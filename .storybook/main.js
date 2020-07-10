module.exports = {
	stories: ["../src/**/*.stories.tsx"],
	addons: [
		"@storybook/preset-create-react-app",
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-viewport",
		"@storybook/addon-knobs",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve("react-docgen-typescript-loader"),
				},
			],
		});
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
};
