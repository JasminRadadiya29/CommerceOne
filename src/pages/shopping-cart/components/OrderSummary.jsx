import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ items, shipping, tax, discount, onApplyPromoCode }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');

    // Simulate API call
    setTimeout(() => {
      const validCodes = ['SAVE10', 'WELCOME20', 'FIRST15'];
      if (validCodes?.includes(promoCode?.toUpperCase())) {
        const discountAmount = promoCode?.toUpperCase() === 'SAVE10' ? subtotal * 0.1 :
                              promoCode?.toUpperCase() === 'WELCOME20' ? subtotal * 0.2 :
                              subtotal * 0.15;
        onApplyPromoCode(promoCode?.toUpperCase(), discountAmount);
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code. Try SAVE10, WELCOME20, or FIRST15');
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({items?.length} items)</span>
          <span className="text-foreground font-medium">${subtotal?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shipping === 0 ? 'Free' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="text-foreground font-medium">${tax?.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Discount Applied</span>
            <span className="text-success font-medium">-${discount?.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            loading={isApplyingPromo}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={handleCheckout}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {/* Trust Signals */}
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="RotateCcw" size={16} className="text-success" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Headphones" size={16} className="text-success" />
          <span>24/7 customer support</span>
        </div>
      </div>
      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground mb-3">We accept:</div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={14} />
          </div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">PP</span>
          </div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">AP</span>
          </div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">GP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;