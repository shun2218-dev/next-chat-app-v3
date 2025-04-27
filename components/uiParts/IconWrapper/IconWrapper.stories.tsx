import type { Meta, StoryObj } from '@storybook/react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { IconWrapper } from './IconWrapper';

const meta: Meta<typeof IconWrapper> = {
  component: IconWrapper,
  title: 'uiParts/IconWrapper',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof IconWrapper>;

export const Default: Story = {
  args: {
    children: <AccountCircleOutlinedIcon />,
  },
};
