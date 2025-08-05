import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Track Orders",
      description: "View shipping status",
      icon: "Truck",
      action: "track",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Reorder Items",
      description: "Buy again quickly",
      icon: "RotateCcw",
      action: "reorder",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Customer Support",
      description: "Get help instantly",
      icon: "MessageCircle",
      action: "support",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "View Wishlist",
      description: "Saved for later",
      icon: "Heart",
      action: "wishlist",
      color: "bg-red-50 text-red-600"
    }
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'track':
        // Scroll to order history section
        document.getElementById('order-history')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'reorder':
        // Show reorder modal or navigate to last order
        console.log('Reorder functionality');
        break;
      case 'support':
        // Open chat widget or support page
        console.log('Support chat opened');
        break;
      case 'wishlist':
        // Scroll to wishlist section
        document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {quickActions?.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/5 border border-border rounded-lg"
          onClick={() => handleQuickAction(action?.action)}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action?.color}`}>
            <Icon name={action?.icon} size={20} />
          </div>
          <div className="text-center">
            <p className="font-medium text-sm text-foreground">{action?.title}</p>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;