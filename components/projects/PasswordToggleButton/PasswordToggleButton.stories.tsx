import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { PasswordToggleButton } from './PasswordToggleButton';

const meta: Meta<typeof PasswordToggleButton> = {
  component: PasswordToggleButton,
  title: 'projects/PasswordToggleButton',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PasswordToggleButton>;

export const Default: Story = {
  render: function Render(args) {
    const [{ isVisible }, updateArgs] = useArgs();
    const handleToggle = () => {
      action('toggleVisibility')(isVisible);
      updateArgs({ isVisible: !isVisible });
    };

    return <PasswordToggleButton {...args} toggleVisibility={handleToggle} />;
  },
  args: {
    isVisible: false,
  },
};

export const Visible: Story = {
  render: function Render(args) {
    const [{ isVisible }, updateArgs] = useArgs();
    const handleToggle = () => {
      action('toggleVisibility')(isVisible);
      updateArgs({ isVisible: !isVisible });
    };

    return <PasswordToggleButton {...args} toggleVisibility={handleToggle} />;
  },
  args: {
    isVisible: true,
  },
};
