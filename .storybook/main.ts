import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@chakra-ui/storybook-addon',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	features: {
		emotionAlias: false,
	},
	webpackFinal: async (config, { configType }) => {
		if (!config.resolve) return {};
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, '../src/'),
		};
		return config;
	},
};
export default config;