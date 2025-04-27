import type { Meta, StoryObj } from '@storybook/react';

import { QRCode } from './QRCode';

const meta: Meta<typeof QRCode> = {
  component: QRCode,
  title: 'projects/QRCode',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QRCode>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <div>
        <QRCode {...args} />
        {args.value}
      </div>
    );
  },
  args: {
    value: 'https://nextui.org',
  },
};

export const Error: Story = {
  render: function Render(args) {
    return (
      <div>
        <QRCode {...args} />
        {args.value}
      </div>
    );
  },
  args: {
    value: '',
  },
};
