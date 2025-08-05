import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyProgram = ({ user }) => {
  const loyaltyTiers = [
    { name: 'Bronze', minPoints: 0, color: 'bg-amber-600', benefits: ['Free shipping on orders $50+', '5% birthday discount'] },
    { name: 'Silver', minPoints: 500, color: 'bg-gray-400', benefits: ['Free shipping on all orders', '10% birthday discount', 'Early access to sales'] },
    { name: 'Gold', minPoints: 1000, color: 'bg-yellow-500', benefits: ['Free shipping + returns', '15% birthday discount', 'Priority customer support', 'Exclusive products'] },
    { name: 'Platinum', minPoints: 2000, color: 'bg-purple-600', benefits: ['All Gold benefits', '20% birthday discount', 'Personal shopping assistant', 'VIP events'] }
  ];

  const currentTier = loyaltyTiers?.reduce((prev, curr) => 
    user?.loyaltyPoints >= curr?.minPoints ? curr : prev
  );

  const nextTier = loyaltyTiers?.find(tier => tier?.minPoints > user?.loyaltyPoints);
  const pointsToNext = nextTier ? nextTier?.minPoints - user?.loyaltyPoints : 0;
  const progressPercentage = nextTier 
    ? ((user?.loyaltyPoints - currentTier?.minPoints) / (nextTier?.minPoints - currentTier?.minPoints)) * 100
    : 100;

  const availableRewards = [
    { id: 1, name: '$10 Off Next Purchase', points: 200, description: 'Valid on orders $50+' },
    { id: 2, name: 'Free Shipping', points: 100, description: 'On your next order' },
    { id: 3, name: '$25 Off Next Purchase', points: 500, description: 'Valid on orders $100+' },
    { id: 4, name: 'Exclusive Product Access', points: 750, description: 'Early access to new collections' }
  ];

  const handleRedeemReward = (reward) => {
    if (user?.loyaltyPoints >= reward?.points) {
      console.log(`Redeeming ${reward?.name} for ${reward?.points} points`);
      // Add redemption logic here
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-crimson font-semibold text-foreground">
        Loyalty Program
      </h2>
      {/* Current Status */}
      <div className="bg-gradient-to-r from-brand-charcoal to-gray-700 text-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{currentTier?.name} Member</h3>
            <p className="text-gray-200">{user?.loyaltyPoints} points available</p>
          </div>
          <div className={`w-12 h-12 rounded-full ${currentTier?.color} flex items-center justify-center`}>
            <Icon name="Star" size={24} className="text-white" />
          </div>
        </div>

        {nextTier && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {nextTier?.name}</span>
              <span>{pointsToNext} points to go</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-brand-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Current Tier Benefits */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Your {currentTier?.name} Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentTier?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Available Rewards */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableRewards?.map((reward) => (
            <div key={reward?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{reward?.name}</h4>
                  <p className="text-sm text-muted-foreground">{reward?.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">{reward?.points} pts</p>
                </div>
              </div>
              <Button
                variant={user?.loyaltyPoints >= reward?.points ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={user?.loyaltyPoints < reward?.points}
                onClick={() => handleRedeemReward(reward)}
              >
                {user?.loyaltyPoints >= reward?.points ? 'Redeem' : 'Not Enough Points'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* How to Earn Points */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">How to Earn Points</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="ShoppingBag" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Make a purchase</span>
            </div>
            <span className="text-sm font-medium text-accent">1 point per $1</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Star" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Write a review</span>
            </div>
            <span className="text-sm font-medium text-accent">25 points</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Share" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Refer a friend</span>
            </div>
            <span className="text-sm font-medium text-accent">100 points</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Birthday bonus</span>
            </div>
            <span className="text-sm font-medium text-accent">50 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;