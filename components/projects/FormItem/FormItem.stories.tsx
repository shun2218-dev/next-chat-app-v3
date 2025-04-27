import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@heroui/input';

import { FormItem } from './FormItem';

const meta: Meta<typeof FormItem> = {
  component: FormItem,
  title: 'projects/FormItem',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FormItem>;

export const Default: Story = {
  args: {
    children: <Input label="email" />,
  },
};
