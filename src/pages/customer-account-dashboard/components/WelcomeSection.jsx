import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user }) => {
  const currentHour = new Date()?.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-gradient-to-r from-brand-charcoal to-gray-700 text-white rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-crimson font-semibold mb-2">
            {greeting}, {user?.firstName}!
          </h1>
          <p className="text-gray-200 mb-4">
            Welcome back to your CommerceOne account
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Package" size={16} />
              <span>{user?.totalOrders} Orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} />
              <span>{user?.wishlistCount} Wishlist Items</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} />
              <span>{user?.loyaltyPoints} Points</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-brand-charcoal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;