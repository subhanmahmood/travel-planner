import type { Meta, StoryObj } from '@storybook/react';

import ListItem from './list-item.component';

const meta: Meta<typeof ListItem> = {
	title: 'ListItem',
	component: ListItem,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
	args: {
		packed: false,
		name: 'Socks',
	},
};
