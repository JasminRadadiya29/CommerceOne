import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderReview = ({ onBack, onComplete, formData, orderSummary }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 3000);
  };

  const getPaymentMethodDisplay = () => {
    if (formData?.paymentMethod === 'card') {
      return `•••• •••• •••• ${formData?.cardNumber?.slice(-4) || '****'}`;
    }
    return formData?.paymentMethod?.charAt(0)?.toUpperCase() + formData?.paymentMethod?.slice(1) || 'Not selected';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-crimson font-semibold text-foreground mb-2">
          Review Your Order
        </h2>
        <p className="text-sm text-muted-foreground">
          Please review all details before placing your order.
        </p>
      </div>
      {/* Order Items */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Order Items</h3>
        <div className="space-y-3">
          {orderSummary?.items?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item?.variant && `${item?.variant} • `}Qty: {item?.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">${item?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Shipping Information</h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Name:</span>
            <span className="text-sm text-foreground">{formData?.firstName} {formData?.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Address:</span>
            <span className="text-sm text-foreground text-right">
              {formData?.address}<br />
              {formData?.apartment && `${formData?.apartment}, `}
              {formData?.city}, {formData?.state} {formData?.zipCode}<br />
              {formData?.country}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Phone:</span>
            <span className="text-sm text-foreground">{formData?.phone}</span>
          </div>
        </div>
      </div>
      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Payment Information</h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Payment Method:</span>
            <span className="text-sm text-foreground">{getPaymentMethodDisplay()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Billing Email:</span>
            <span className="text-sm text-foreground">{formData?.email}</span>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Order Summary</h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="text-sm text-foreground">${orderSummary?.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Shipping:</span>
            <span className="text-sm text-foreground">
              {formData?.shippingCost === 0 ? 'Free' : `$${formData?.shippingCost}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Tax:</span>
            <span className="text-sm text-foreground">${orderSummary?.tax}</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total:</span>
              <span className="font-medium text-foreground text-lg">${orderSummary?.total}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
          description="By checking this box, you agree to our terms and conditions"
        />
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          className="flex-1"
          disabled={isProcessing}
        >
          Back to Payment
        </Button>
        <Button
          type="button"
          onClick={handlePlaceOrder}
          className="flex-1"
          iconName={isProcessing ? "Loader2" : "CheckCircle"}
          iconPosition="right"
          loading={isProcessing}
          disabled={!agreedToTerms}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
      {/* Security Notice */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-success mb-1">Secure Checkout</h4>
            <p className="text-sm text-success/80">
              Your order is protected by 256-bit SSL encryption. We guarantee secure processing of your payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;