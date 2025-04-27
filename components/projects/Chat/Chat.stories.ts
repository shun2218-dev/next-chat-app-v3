import type { Meta, StoryObj } from '@storybook/react';

import { Chat } from './Chat';

const meta: Meta<typeof Chat> = {
  component: Chat,
  title: 'projects/Chat',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  args: {
    chatId: '1234567890',
  },
};
