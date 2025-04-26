import type { Meta, StoryObj } from '@storybook/react';

import { FriendUserList } from './FriendUserList';

const meta: Meta<typeof FriendUserList> = {
  component: FriendUserList,
  title: 'projects/FriendUserList',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FriendUserList>;

export const Default: Story = {};
