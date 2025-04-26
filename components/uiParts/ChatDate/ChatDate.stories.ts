import type { Meta, StoryObj } from '@storybook/react';

import { ChatDate } from './ChatDate';

const meta: Meta<typeof ChatDate> = {
  component: ChatDate,
  title: 'uiParts/ChatDate',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChatDate>;

export const Default: Story = {
  args: {
    timestamp: new Date(),
    isScrolled: false,
  },
};

export const Scrolled: Story = {
  args: {
    timestamp: new Date(),
    isScrolled: true,
  },
};
