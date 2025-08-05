import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import NavigationSidebar from './components/NavigationSidebar';
import OrderHistory from './components/OrderHistory';
import WishlistSection from './components/WishlistSection';
import LoyaltyProgram from './components/LoyaltyProgram';
import RecentActivity from './components/RecentActivity';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import MobileTabNavigation from './components/MobileTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerAccountDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  // Mock user data
  const user = {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-08-05", // Today's date for birthday message
    joinDate: "2023-03-15",
    totalOrders: 12,
    wishlistCount: 5,
    loyaltyPoints: 850,
    tier: "Silver",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  };

  useEffect(() => {
    // Check if today is user's birthday
    const today = new Date();
    const birthday = new Date(user.dateOfBirth);
    
    if (today?.getMonth() === birthday?.getMonth() && today?.getDate() === birthday?.getDate()) {
      setShowBirthdayMessage(true);
    }
  }, [user?.dateOfBirth]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Scroll to top on mobile when changing sections
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <QuickActions />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentActivity />
              <PersonalizedRecommendations />
            </div>
          </div>
        );
      case 'orders':
        return <OrderHistory />;
      case 'wishlist':
        return <WishlistSection />;
      case 'loyalty':
        return <LoyaltyProgram user={user} />;
      case 'addresses':
        return (
          <div className="text-center py-12">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Address Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage your shipping and billing addresses
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Add New Address
            </Button>
          </div>
        );
      case 'payments':
        return (
          <div className="text-center py-12">
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Payment Methods</h3>
            <p className="text-muted-foreground mb-4">
              Manage your saved payment methods
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Add Payment Method
            </Button>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-crimson font-semibold text-foreground">
              Account Settings
            </h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <p className="text-muted-foreground">{user?.firstName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <p className="text-muted-foreground">{user?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <p className="text-muted-foreground">{user?.phone}</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4" iconName="Edit" iconPosition="left">
                Edit Information
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Birthday Message */}
          {showBirthdayMessage && (
            <div className="bg-gradient-to-r from-brand-gold/20 to-yellow-100 border border-brand-gold/30 rounded-lg p-4 mb-6 relative">
              <div className="flex items-center space-x-3">
                <Icon name="Gift" size={24} className="text-brand-gold" />
                <div>
                  <h3 className="font-semibold text-foreground">Happy Birthday, {user?.firstName}! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy a special 15% birthday discount on your next purchase. Use code: BIRTHDAY15
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setShowBirthdayMessage(false)}
                iconName="X"
              />
            </div>
          )}

          <WelcomeSection user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <NavigationSidebar 
                activeSection={activeSection} 
                onSectionChange={handleSectionChange} 
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Tab Navigation */}
      <MobileTabNavigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
    </div>
  );
};

export default CustomerAccountDashboard;