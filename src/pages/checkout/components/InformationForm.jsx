import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const InformationForm = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsGuest(false);
      setFormData(prev => ({
        ...prev,
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || ''
      }));
    }
  }, [setFormData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    
    if (!formData?.firstName) newErrors.firstName = 'First name is required';
    if (!formData?.lastName) newErrors.lastName = 'Last name is required';
    if (!formData?.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/?.test(formData?.phone)) newErrors.phone = 'Invalid phone format';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-crimson font-semibold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-sm text-muted-foreground">
          We'll use this information to keep you updated about your order.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          description="Order confirmation will be sent here"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
          description="For delivery updates and support"
        />

        {isGuest && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <Checkbox
              label="Create an account for faster checkout next time"
              checked={formData?.createAccount}
              onChange={(e) => handleInputChange('createAccount', e?.target?.checked)}
              description="Save your information for future purchases"
            />
          </div>
        )}

        <Checkbox
          label="Keep me updated on new products and exclusive offers"
          checked={formData?.newsletter}
          onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
        />

        <div className="pt-4">
          <Button type="submit" className="w-full" iconName="ArrowRight" iconPosition="right">
            Continue to Shipping
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InformationForm;