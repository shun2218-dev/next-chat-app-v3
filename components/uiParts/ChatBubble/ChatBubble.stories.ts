import type { Meta, StoryObj } from '@storybook/react';

import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  component: ChatBubble,
  title: 'uiParts/ChatBubble',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const Own: Story = {
  args: {
    message: 'Hello, this is a own chat bubble!',
    sender: 'own',
  },
};

export const Other: Story = {
  args: {
    message: 'Hello, this is a chat other bubble!',
    sender: 'other',
  },
};
