import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const ShippingForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 0,
      duration: '5-7 business days',
      description: 'Free shipping on orders over $50'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99,
      duration: '2-3 business days',
      description: 'Faster delivery for urgent orders'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 24.99,
      duration: '1 business day',
      description: 'Next day delivery by 6 PM'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.address) newErrors.address = 'Address is required';
    if (!formData?.city) newErrors.city = 'City is required';
    if (!formData?.state) newErrors.state = 'State is required';
    if (!formData?.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData?.country) newErrors.country = 'Country is required';
    if (!formData?.shippingMethod) newErrors.shippingMethod = 'Please select a shipping method';

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

  const handleShippingSelect = (optionId) => {
    const selectedOption = shippingOptions?.find(opt => opt?.id === optionId);
    setFormData(prev => ({
      ...prev,
      shippingMethod: optionId,
      shippingCost: selectedOption?.price
    }));
    if (errors?.shippingMethod) {
      setErrors(prev => ({ ...prev, shippingMethod: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-crimson font-semibold text-foreground mb-2">
          Shipping Address
        </h2>
        <p className="text-sm text-muted-foreground">
          Where should we deliver your order?
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Street Address"
          type="text"
          placeholder="123 Main Street"
          value={formData?.address}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <Input
          label="Apartment, suite, etc. (optional)"
          type="text"
          placeholder="Apt 4B"
          value={formData?.apartment}
          onChange={(e) => handleInputChange('apartment', e?.target?.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="San Francisco"
            value={formData?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Select
            label="State"
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            placeholder="Select state"
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            placeholder="94102"
            value={formData?.zipCode}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>

        <Select
          label="Country"
          options={countryOptions}
          value={formData?.country}
          onChange={(value) => handleInputChange('country', value)}
          error={errors?.country}
          placeholder="Select country"
          required
        />

        <div className="space-y-4">
          <h3 className="text-lg font-crimson font-semibold text-foreground">
            Shipping Method
          </h3>
          {errors?.shippingMethod && (
            <p className="text-sm text-destructive">{errors?.shippingMethod}</p>
          )}
          <div className="space-y-3">
            {shippingOptions?.map((option) => (
              <div
                key={option?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  formData?.shippingMethod === option?.id
                    ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                }`}
                onClick={() => handleShippingSelect(option?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData?.shippingMethod === option?.id
                          ? 'border-accent bg-accent' :'border-border'
                      }`}
                    >
                      {formData?.shippingMethod === option?.id && (
                        <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{option?.name}</h4>
                      <p className="text-sm text-muted-foreground">{option?.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {option?.price === 0 ? 'Free' : `$${option?.price}`}
                    </p>
                    <p className="text-sm text-muted-foreground">{option?.duration}</p>
                  </div>
                </div>
              </div>
            ))}
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
            Back to Information
          </Button>
          <Button
            type="submit"
            className="flex-1"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;