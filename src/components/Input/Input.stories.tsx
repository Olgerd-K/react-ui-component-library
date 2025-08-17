import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A smart Input component with password visibility toggle, clearable functionality, and multiple input types.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number', 'email', 'tel'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Input size',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether input is clearable',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether input is disabled',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
    },
    success: {
      control: { type: 'boolean' },
      description: 'Success state',
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    label: 'Text Input',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Input',
    placeholder: 'Type something to see clear button',
    clearable: true,
    value: 'Sample text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is required',
  },
};

export const Success: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    value: 'user@example.com',
    success: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Input',
    placeholder: 'Small size input',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Input',
    placeholder: 'Large size input',
  },
};

export const WithCharacterCounter: Story = {
  args: {
    label: 'Bio (Max 100 characters)',
    placeholder: 'Tell us about yourself...',
    maxLength: 100,
    showCounter: true,
    clearable: true,
  },
};

export const PasswordWithClear: Story = {
  args: {
    type: 'password',
    label: 'Password with Clear',
    placeholder: 'Enter password',
    clearable: true,
    value: 'secret123',
  },
};
