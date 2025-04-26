import type { FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import EmailIcon from '@mui/icons-material/Email';
import { Input } from '@nextui-org/input';
import { action } from '@storybook/addon-actions';

import FormItem from '../FormItem/FormItem';

import { BasicForm } from './BasicForm';

const meta: Meta<typeof BasicForm> = {
  component: BasicForm,
  title: 'projects/BasicForm',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BasicForm>;

const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
  e.preventDefault();
  action('handleSubmit')(e);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Default: Story = {
  args: {
    buttonText: 'Submit',
    buttonIcon: <EmailIcon />,
    formTitle: 'Basic Form',
    handleSubmit,
    children: (
      <FormItem>
        <Input label="Email" />
      </FormItem>
    ),
    footer: <p>BasicForm footer area</p>,
    isLoading: false,
    isValid: true,
  },
};

export const Loading: Story = {
  args: {
    buttonText: 'Submit',
    buttonIcon: <EmailIcon />,
    formTitle: 'Basic Form',
    handleSubmit,
    children: (
      <FormItem>
        <Input label="Email" />
      </FormItem>
    ),
    footer: <p>BasicForm footer area</p>,
    isLoading: true,
    isValid: true,
  },
};

export const Invalid: Story = {
  args: {
    buttonText: 'Submit',
    buttonIcon: <EmailIcon />,
    formTitle: 'Basic Form',
    handleSubmit,
    children: (
      <FormItem>
        <Input label="Email" />
      </FormItem>
    ),
    footer: <p>BasicForm footer area</p>,
    isLoading: false,
    isValid: false,
  },
};

export const NoFooter: Story = {
  args: {
    buttonText: 'Submit',
    buttonIcon: <EmailIcon />,
    formTitle: 'Basic Form',
    handleSubmit,
    children: (
      <FormItem>
        <Input label="Email" />
      </FormItem>
    ),
    isLoading: false,
    isValid: true,
  },
};
