// components/ui/Tabs.jsx
import React, { useState } from 'react';
import clsx from 'clsx';

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab, className }) => {
  return (
    <div className={clsx('flex space-x-4', className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive: activeTab === child.props.value,
          onClick: () => setActiveTab(child.props.value),
        })
      )}
    </div>
  );
};

export const TabsTrigger = ({ children, value, isActive, onClick, className }) => {
  const tabClasses = clsx(
    'cursor-pointer px-4 py-2 text-sm font-medium',
    isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700',
    className
  );

  return (
    <button onClick={onClick} className={tabClasses}>
      {children}
    </button>
  );
};
