import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'order_shipped',
      title: 'Order Shipped',
      description: 'Your order #ORD-2024-002 has been shipped via UPS',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Truck',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'price_drop',
      title: 'Price Drop Alert',
      description: 'Vintage Leather Journal is now $89.99 (was $109.99)',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: 'TrendingDown',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'wishlist_back_in_stock',
      title: 'Back in Stock',
      description: 'Handcrafted Wooden Bowl Set is now available',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Package',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'loyalty_points',
      title: 'Points Earned',
      description: 'You earned 300 loyalty points from your recent purchase',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Star',
      color: 'text-yellow-600'
    },
    {
      id: 5,
      type: 'exclusive_offer',
      title: 'Exclusive Offer',
      description: 'Special 15% discount on new arrivals - expires in 3 days',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Gift',
      color: 'text-red-600'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-crimson font-semibold text-foreground">
        Recent Activity
      </h2>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-accent/5 transition-colors duration-200">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${activity?.color}`}>
                <Icon name={activity?.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground">{activity?.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="text-sm text-accent hover:text-accent/80 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;