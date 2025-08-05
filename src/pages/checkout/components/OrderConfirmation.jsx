import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderConfirmation = ({ orderData }) => {
  useEffect(() => {
    // Clear cart after successful order
    localStorage.removeItem('cart');
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const orderNumber = `CO-${Date.now()?.toString()?.slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My CommerceOne Order',
        text: `I just placed an order on CommerceOne! Order #${orderNumber}`,
        url: window.location?.origin
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just placed an order on CommerceOne! Order #${orderNumber}`;
      navigator.clipboard?.writeText(text);
      alert('Order details copied to clipboard!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>
      {/* Success Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-crimson font-semibold text-foreground">
          Order Confirmed!
        </h1>
        <p className="text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>
      </div>
      {/* Order Details */}
      <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
        <div className="text-center border-b border-border pb-4">
          <h2 className="text-xl font-crimson font-semibold text-foreground mb-2">
            Order Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="text-foreground font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="text-foreground">
                  {new Date()?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="text-foreground font-semibold">${orderData?.total}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">Delivery Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Method:</span>
                <span className="text-foreground">Standard Shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="text-foreground">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking:</span>
                <span className="text-accent">Available soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="font-medium text-foreground">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Package" size={20} className="text-accent" />
            </div>
            <h4 className="font-medium text-foreground">Order Processing</h4>
            <p className="text-muted-foreground">We'll prepare your items for shipment</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Truck" size={20} className="text-accent" />
            </div>
            <h4 className="font-medium text-foreground">Shipping</h4>
            <p className="text-muted-foreground">Your order will be shipped within 1-2 business days</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Home" size={20} className="text-accent" />
            </div>
            <h4 className="font-medium text-foreground">Delivery</h4>
            <p className="text-muted-foreground">Enjoy your new purchase!</p>
          </div>
        </div>
      </div>
      {/* Email Confirmation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-left">
            <h4 className="font-medium text-blue-900 mb-1">Confirmation Email Sent</h4>
            <p className="text-sm text-blue-700">
              We've sent a detailed order confirmation to <strong>{orderData?.email}</strong>. 
              Please check your inbox and spam folder.
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/customer-account-dashboard">
          <Button variant="outline" iconName="User" iconPosition="left" className="w-full sm:w-auto">
            View Account
          </Button>
        </Link>
        <Button 
          onClick={handleShareOrder}
          variant="outline" 
          iconName="Share2" 
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Share Order
        </Button>
        <Link to="/product-catalog">
          <Button iconName="ShoppingBag" iconPosition="left" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
      {/* Customer Support */}
      <div className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Need help with your order?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
            Live Chat
          </Button>
          <Button variant="ghost" size="sm" iconName="Phone" iconPosition="left">
            Call Support
          </Button>
          <Button variant="ghost" size="sm" iconName="Mail" iconPosition="left">
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;