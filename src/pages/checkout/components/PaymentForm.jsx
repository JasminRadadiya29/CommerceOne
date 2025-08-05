import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone' }
  ];

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!formData?.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/?.test(formData?.cardNumber?.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!formData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!formData?.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/?.test(formData?.cvv)) newErrors.cvv = 'Invalid CVV';
    
    if (!formData?.cardName) newErrors.cardName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (paymentMethod === 'card' && !validateCardForm()) {
      return;
    }
    onNext();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    handleInputChange('cardNumber', formatted);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-crimson font-semibold text-foreground mb-2">
          Payment Method
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to pay for your order.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                paymentMethod === method?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
              onClick={() => setPaymentMethod(method?.id)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method?.id
                      ? 'border-accent bg-accent' :'border-border'
                  }`}
                >
                  {paymentMethod === method?.id && (
                    <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                  )}
                </div>
                <Icon name={method?.icon} size={20} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{method?.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 border-t pt-6">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData?.cardNumber}
              onChange={handleCardNumberChange}
              error={errors?.cardNumber}
              required
              maxLength={19}
            />

            <div className="grid grid-cols-3 gap-4">
              <Select
                label="Month"
                options={monthOptions}
                value={formData?.expiryMonth}
                onChange={(value) => handleInputChange('expiryMonth', value)}
                error={errors?.expiryMonth}
                placeholder="MM"
                required
              />
              <Select
                label="Year"
                options={yearOptions}
                value={formData?.expiryYear}
                onChange={(value) => handleInputChange('expiryYear', value)}
                error={errors?.expiryYear}
                placeholder="YYYY"
                required
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={formData?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                error={errors?.cvv}
                required
                maxLength={4}
              />
            </div>

            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={formData?.cardName}
              onChange={(e) => handleInputChange('cardName', e?.target?.value)}
              error={errors?.cardName}
              required
            />

            <Checkbox
              label="Save this card for future purchases"
              checked={formData?.saveCard}
              onChange={(e) => handleInputChange('saveCard', e?.target?.checked)}
              description="Securely store for faster checkout"
            />
          </div>
        )}

        {/* Alternative Payment Methods */}
        {paymentMethod !== 'card' && (
          <div className="border-t pt-6">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <Icon name="ExternalLink" size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                You'll be redirected to {paymentMethods?.find(m => m?.id === paymentMethod)?.name} to complete your payment securely.
              </p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-success mb-1">Secure Payment</h4>
              <p className="text-sm text-success/80">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            Back to Shipping
          </Button>
          <Button
            type="submit"
            className="flex-1"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Review Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;