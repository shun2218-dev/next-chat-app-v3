import type { Meta, StoryObj } from '@storybook/react';

import { AddFriend } from './AddFriend';

const meta: Meta<typeof AddFriend> = {
  component: AddFriend,
  title: 'projects/AddFriend',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddFriend>;

export const Default: Story = {};
