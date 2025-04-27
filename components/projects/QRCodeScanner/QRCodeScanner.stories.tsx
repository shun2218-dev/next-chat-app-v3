import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { QRCodeScanner } from './QRCodeScanner';

const meta: Meta<typeof QRCodeScanner> = {
  component: QRCodeScanner,
  title: 'projects/QRCodeScanner',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [isActive, setActive] = useState(false);

      return (
        <div>
          <label htmlFor="is-active">
            <input
              checked={isActive}
              className="mr-2"
              id="is-active"
              type="checkbox"
              onChange={(e) => setActive(e.target.checked)}
            />
            {isActive ? 'on' : 'off'}
          </label>
          {isActive && <Story />}
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof QRCodeScanner>;

export const Default: Story = {};
