import type { Meta, StoryObj } from '@storybook/react';
import type { RegisterInputs } from '@/types';

import { useForm } from 'react-hook-form';

import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: 'projects/PasswordInput',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

const Wrapper = (args: any) => {
  const { register } = useForm<RegisterInputs>();

  return <PasswordInput {...args} register={register} />;
};

export const Default: Story = {
  args: {
    label: 'Password',
    errorMessage: undefined,
    isConfirm: false,
  },
  render: (args) => <Wrapper {...args} />,
};

export const Error: Story = {
  args: {
    label: 'Password',
    errorMessage: 'This field is required',
    isConfirm: false,
  },
  render: (args) => <Wrapper {...args} />,
};

export const PasswordConfirm: Story = {
  args: {
    label: 'Input password again to confirm',
    errorMessage: undefined,
    isConfirm: true,
  },
  render: (args) => <Wrapper {...args} />,
};
