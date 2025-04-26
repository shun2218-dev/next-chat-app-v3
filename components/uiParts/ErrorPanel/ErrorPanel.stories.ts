import type { Meta, StoryObj } from '@storybook/react';

import { ErrorPanel } from './ErrorPanel';

const meta: Meta<typeof ErrorPanel> = {
  component: ErrorPanel,
  title: 'uiParts/ErrorPanel',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ErrorPanel>;

export const Default: Story = {
  args: {
    children: 'An error occurred while processing your request.',
  },
};
