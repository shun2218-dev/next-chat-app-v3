import type { Meta, StoryObj } from '@storybook/react';

import { QRSwitch } from './QRSwitch';

const meta: Meta<typeof QRSwitch> = {
  component: QRSwitch,
  title: 'projects/QRSwitch',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex justify-start">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof QRSwitch>;

export const Default: Story = {};
