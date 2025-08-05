import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileTabNavigation = ({ activeSection, onSectionChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Orders', icon: 'Package' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'loyalty', label: 'Rewards', icon: 'Star' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onSectionChange(tab?.id)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              activeSection === tab?.id
                ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={20} 
              className={activeSection === tab?.id ? 'text-accent' : 'text-muted-foreground'}
            />
            <span className="text-xs font-medium">{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabNavigation;