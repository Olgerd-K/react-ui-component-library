import { useState, useEffect } from 'react';
import { Input, Toast, SidebarMenu } from './components';
import type { MenuItem } from './components';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const menuItems: MenuItem[] = [
    { id: '1', label: 'Dashboard', icon: '🏠', href: '/dashboard' },
    { 
      id: '2', 
      label: 'Components', 
      icon: '🧩',
      children: [
        { id: '2-1', label: 'Input', href: '#input' },
        { id: '2-2', label: 'Toast', href: '#toast' },
        { id: '2-3', label: 'Sidebar', href: '#sidebar' },
      ]
    },
    { id: '3', label: 'Documentation', icon: '📚', href: '/docs' },
    { id: '4', label: 'Settings', icon: '⚙️', href: '/settings' },
  ];

  useEffect(() => {
    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className={`App ${isLoaded ? 'loaded' : 'loading'}`}>
      <header className="App-header">
        <h1>React Component Library</h1>
        <p>A showcase of reusable UI components built with React and Storybook</p>
      </header>

      <main className="App-main">
        <section id="input" className="component-section">
          <h2>Input Component</h2>
          <div className="component-showcase">
            <div className="input-group">
              <Input
                label="Text Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={setInputValue}
                clearable
              />
            </div>
            
            <div className="input-group">
              <Input
                type="password"
                label="Password Input"
                placeholder="Enter your password"
                clearable
              />
            </div>
            
            <div className="input-group">
              <Input
                type="email"
                label="Email Input"
                placeholder="Enter your email"
                error="Please enter a valid email address"
              />
            </div>
            
            <div className="input-group">
              <Input
                type="number"
                label="Age Input"
                placeholder="Enter your age"
                size="small"
              />
            </div>

            <div className="input-group">
              <Input
                label="Bio (Max 100 characters)"
                placeholder="Tell us about yourself..."
                value={bioValue}
                onChange={setBioValue}
                maxLength={100}
                showCounter={true}
                clearable={true}
              />
            </div>
          </div>
        </section>

        <section id="toast" className="component-section">
          <h2>Toast Component</h2>
          <div className="component-showcase">
            <div className="toast-buttons">
              <button 
                onClick={() => showToast('success', 'Success!', 'Operation completed successfully.')}
                className="toast-btn toast-btn--success"
              >
                Show Success Toast
              </button>
              
              <button 
                onClick={() => showToast('error', 'Error!', 'Something went wrong. Please try again.')}
                className="toast-btn toast-btn--error"
              >
                Show Error Toast
              </button>
              
              <button 
                onClick={() => showToast('warning', 'Warning!', 'Please review your input before proceeding.')}
                className="toast-btn toast-btn--warning"
              >
                Show Warning Toast
              </button>
              
              <button 
                onClick={() => showToast('info', 'Info', 'Here is some useful information.')}
                className="toast-btn toast-btn--info"
              >
                Show Info Toast
              </button>
            </div>
          </div>
        </section>

        <section id="sidebar" className="component-section">
          <h2>Sidebar Menu Component</h2>
          <div className="component-showcase">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="sidebar-btn"
            >
              Open Sidebar Menu
            </button>
          </div>
        </section>
      </main>

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            visible={true}
            onClose={() => removeToast(toast.id)}
            position="bottom-right"
          />
        ))}
      </div>

      {/* Sidebar Menu */}
      <SidebarMenu
        isOpen={sidebarOpen}
        items={menuItems}
        onClose={() => setSidebarOpen(false)}
        position="right"
        width={300}
      />
    </div>
  );
}

export default App;
