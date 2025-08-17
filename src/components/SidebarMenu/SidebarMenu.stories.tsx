import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu } from './SidebarMenu';
import type { MenuItem } from './SidebarMenu';
import { useState } from 'react';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A Sidebar Menu component with sliding animation, nested submenus, and background click to close functionality.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Sidebar width in pixels',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Sidebar position',
    },
    showBackdrop: {
      control: { type: 'boolean' },
      description: 'Whether to show backdrop',
    },
    onClose: { action: 'closed' },
    onItemClick: { action: 'item clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu data
const simpleMenuItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { id: '2', label: 'Profile', icon: '👤', href: '/profile' },
  { id: '3', label: 'Settings', icon: '⚙️', href: '/settings' },
  { id: '4', label: 'Help', icon: '❓', href: '/help' },
];

const nestedMenuItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { 
    id: '2', 
    label: 'User Management', 
    icon: '👥',
    children: [
      { id: '2-1', label: 'Users', href: '/users' },
      { id: '2-2', label: 'Roles', href: '/roles' },
      { id: '2-3', label: 'Permissions', href: '/permissions' },
    ]
  },
  { 
    id: '3', 
    label: 'Content', 
    icon: '📝',
    children: [
      { id: '3-1', label: 'Articles', href: '/articles' },
      { id: '3-2', label: 'Pages', href: '/pages' },
      { 
        id: '3-3', 
        label: 'Media', 
        children: [
          { id: '3-3-1', label: 'Images', href: '/media/images' },
          { id: '3-3-2', label: 'Videos', href: '/media/videos' },
          { id: '3-3-3', label: 'Documents', href: '/media/documents' },
        ]
      },
    ]
  },
  { id: '4', label: 'Analytics', icon: '📊', href: '/analytics' },
  { id: '5', label: 'Settings', icon: '⚙️', href: '/settings' },
  { id: '6', label: 'Help', icon: '❓', href: '/help' },
];

const complexMenuItems: MenuItem[] = [
  { id: '1', label: 'Home', icon: '🏠', href: '/' },
  { 
    id: '2', 
    label: 'Products', 
    icon: '📦',
    children: [
      { id: '2-1', label: 'Electronics', href: '/products/electronics' },
      { id: '2-2', label: 'Clothing', href: '/products/clothing' },
      { id: '2-3', label: 'Books', href: '/products/books' },
      { 
        id: '2-4', 
        label: 'Sports', 
        children: [
          { id: '2-4-1', label: 'Fitness', href: '/products/sports/fitness' },
          { id: '2-4-2', label: 'Outdoor', href: '/products/sports/outdoor' },
          { id: '2-4-3', label: 'Team Sports', href: '/products/sports/team' },
        ]
      },
    ]
  },
  { 
    id: '3', 
    label: 'Services', 
    icon: '🔧',
    children: [
      { id: '3-1', label: 'Consulting', href: '/services/consulting' },
      { id: '3-2', label: 'Training', href: '/services/training' },
      { id: '3-3', label: 'Support', href: '/services/support' },
    ]
  },
  { id: '4', label: 'About', icon: 'ℹ️', href: '/about' },
  { id: '5', label: 'Contact', icon: '📞', href: '/contact' },
  { id: '6', label: 'Disabled Item', icon: '🚫', disabled: true },
];

// Wrapper component for interactive stories
const SidebarMenuWrapper = ({ items, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Open Sidebar Menu
      </button>
      
      <SidebarMenu
        {...props}
        items={items}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Simple: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={simpleMenuItems} />,
  args: {
    position: 'right',
    width: 280,
    showBackdrop: true,
  },
};

export const Nested: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={nestedMenuItems} />,
  args: {
    position: 'right',
    width: 320,
    showBackdrop: true,
  },
};

export const Complex: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={complexMenuItems} />,
  args: {
    position: 'right',
    width: 350,
    showBackdrop: true,
  },
};

export const LeftPosition: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={nestedMenuItems} />,
  args: {
    position: 'left',
    width: 300,
    showBackdrop: true,
  },
};

export const Wide: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={complexMenuItems} />,
  args: {
    position: 'right',
    width: 400,
    showBackdrop: true,
  },
};

export const NoBackdrop: Story = {
  render: (args) => <SidebarMenuWrapper {...args} items={simpleMenuItems} />,
  args: {
    position: 'right',
    width: 280,
    showBackdrop: false,
  },
};
