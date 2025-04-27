import type { Meta, StoryObj } from '@storybook/react';

import { Listbox, ListboxItem } from '@heroui/listbox';

import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'projects/Sidebar',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    children: (
      <Listbox>
        <ListboxItem>リスト1</ListboxItem>
        <ListboxItem>リスト2</ListboxItem>
        <ListboxItem>リスト3</ListboxItem>
        <ListboxItem>リスト4</ListboxItem>
      </Listbox>
    ),
  },
};
