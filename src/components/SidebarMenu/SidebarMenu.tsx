import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';

export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display text for the menu item */
  label: string;
  /** Icon for the menu item */
  icon?: string;
  /** URL to navigate to */
  href?: string;
  /** Submenu items */
  children?: MenuItem[];
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface SidebarMenuProps {
  /** Whether the sidebar is open */
  isOpen: boolean;
  /** Menu items to display */
  items: MenuItem[];
  /** Sidebar width */
  width?: number;
  /** Sidebar position */
  position?: 'left' | 'right';
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Close handler */
  onClose: () => void;
  /** Item click handler */
  onItemClick?: (item: MenuItem) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  items,
  width = 280,
  position = 'right',
  showBackdrop = true,
  onClose,
  onItemClick,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      // Toggle expanded state for items with children
      const newExpandedItems = new Set(expandedItems);
      if (newExpandedItems.has(item.id)) {
        newExpandedItems.delete(item.id);
      } else {
        newExpandedItems.add(item.id);
      }
      setExpandedItems(newExpandedItems);
    } else if (item.href) {
      // Navigate to URL
      window.location.href = item.href;
      onClose();
    } else {
      // Call custom click handler
      onItemClick?.(item);
      onClose();
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isDisabled = item.disabled;

    return (
      <div key={item.id} className={`sidebar-menu-item sidebar-menu-item--level-${level}`}>
        <button
          className={`sidebar-menu-button ${hasChildren ? 'sidebar-menu-button--has-children' : ''} ${isExpanded ? 'sidebar-menu-button--expanded' : ''} ${isDisabled ? 'sidebar-menu-button--disabled' : ''}`}
          onClick={() => !isDisabled && handleItemClick(item)}
          disabled={isDisabled}
        >
          {item.icon && (
            <span className="sidebar-menu-icon">
              {item.icon}
            </span>
          )}
          
          <span className="sidebar-menu-label">
            {item.label}
          </span>
          
          {hasChildren && (
            <span className={`sidebar-menu-arrow ${isExpanded ? 'sidebar-menu-arrow--expanded' : ''}`}>
              ▼
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="sidebar-submenu">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarStyle = {
    width: `${width}px`,
    [position]: isOpen ? 0 : `-${width}px`,
  };

  return (
    <>
      {showBackdrop && isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={handleBackdropClick}
        />
      )}
      
      <div 
        className={`sidebar-menu sidebar-menu--${position} ${isOpen ? 'sidebar-menu--open' : ''}`}
        style={sidebarStyle}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">Menu</h3>
          <button 
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {items.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </>
  );
};
