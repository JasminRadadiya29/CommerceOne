import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationSidebar = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Account summary'
    },
    {
      id: 'orders',
      label: 'Order History',
      icon: 'Package',
      description: 'Past purchases'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'Heart',
      description: 'Saved items'
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin',
      description: 'Shipping & billing'
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: 'CreditCard',
      description: 'Cards & wallets'
    },
    {
      id: 'loyalty',
      label: 'Loyalty Program',
      icon: 'Star',
      description: 'Points & rewards'
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'Settings',
      description: 'Preferences'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-fit sticky top-24">
      <h3 className="font-crimson font-semibold text-lg mb-4 text-foreground">
        Account Menu
      </h3>
      <nav className="space-y-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onSectionChange(item?.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
              activeSection === item?.id
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground hover:bg-accent/10 hover:text-accent'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={18} 
              className={activeSection === item?.id ? 'text-accent-foreground' : 'text-muted-foreground'}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item?.label}</p>
              <p className="text-xs opacity-75 truncate">{item?.description}</p>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationSidebar;