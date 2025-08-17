import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Toast notification component with auto-dismiss, different types, and smooth transitions.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Toast type',
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      description: 'Toast position',
    },
    duration: {
      control: { type: 'number' },
      description: 'Auto-dismiss duration in milliseconds',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Whether to show close button',
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether toast is visible',
    },
    onClose: { action: 'closed' },
    onAction: { action: 'action clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    visible: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error!',
    message: 'Something went wrong. Please try again.',
    visible: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning!',
    message: 'Please review your input before proceeding.',
    visible: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'Here is some useful information for you.',
    visible: true,
  },
};

export const WithAction: Story = {
  args: {
    type: 'info',
    title: 'New Message',
    message: 'You have a new message from John Doe.',
    actionText: 'View',
    visible: true,
  },
};

export const NotClosable: Story = {
  args: {
    type: 'success',
    title: 'Processing...',
    message: 'Please wait while we process your request.',
    closable: false,
    visible: true,
  },
};

export const LongDuration: Story = {
  args: {
    type: 'warning',
    title: 'Long Duration',
    message: 'This toast will stay visible for 10 seconds.',
    duration: 10000,
    visible: true,
  },
};

export const NoAutoDismiss: Story = {
  args: {
    type: 'info',
    title: 'Manual Close',
    message: 'This toast will not auto-dismiss. You must close it manually.',
    duration: 0,
    visible: true,
  },
};

export const TopRight: Story = {
  args: {
    type: 'success',
    title: 'Top Right',
    message: 'Positioned at top right corner.',
    position: 'top-right',
    visible: true,
  },
};

export const BottomLeft: Story = {
  args: {
    type: 'info',
    title: 'Bottom Left',
    message: 'Positioned at bottom left corner.',
    position: 'bottom-left',
    visible: true,
  },
};

export const TopCenter: Story = {
  args: {
    type: 'warning',
    title: 'Top Center',
    message: 'Positioned at top center.',
    position: 'top-center',
    visible: true,
  },
};

export const LongMessage: Story = {
  args: {
    type: 'info',
    title: 'Long Message',
    message: 'This is a very long message that demonstrates how the toast component handles text that exceeds the normal length. It should wrap properly and maintain good readability.',
    visible: true,
  },
};
