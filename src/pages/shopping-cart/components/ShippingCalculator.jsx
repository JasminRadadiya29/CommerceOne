import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ShippingCalculator = ({ onShippingUpdate }) => {
  const [zipCode, setZipCode] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!zipCode?.trim()) {
      setError('Please enter a zip code');
      return;
    }

    if (!/^\d{5}(-\d{4})?$/?.test(zipCode?.trim())) {
      setError('Please enter a valid zip code (e.g., 12345 or 12345-6789)');
      return;
    }

    setIsCalculating(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const mockOptions = [
        {
          id: 'standard',
          name: 'Standard Shipping',
          description: '5-7 business days',
          price: 0,
          estimatedDays: '5-7'
        },
        {
          id: 'expedited',
          name: 'Expedited Shipping',
          description: '2-3 business days',
          price: 9.99,
          estimatedDays: '2-3'
        },
        {
          id: 'overnight',
          name: 'Overnight Shipping',
          description: 'Next business day',
          price: 24.99,
          estimatedDays: '1'
        }
      ];

      setShippingOptions(mockOptions);
      setSelectedOption(mockOptions?.[0]);
      onShippingUpdate(mockOptions?.[0]);
      setIsCalculating(false);
    }, 1500);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onShippingUpdate(option);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Truck" size={20} />
        Shipping Calculator
      </h3>
      {/* Zip Code Input */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e?.target?.value)}
          error={error}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={handleCalculate}
          loading={isCalculating}
          disabled={!zipCode?.trim()}
        >
          Calculate
        </Button>
      </div>
      {/* Shipping Options */}
      {shippingOptions?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Available shipping options:</h4>
          {shippingOptions?.map((option) => (
            <div
              key={option?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedOption?.id === option?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedOption?.id === option?.id
                      ? 'border-accent bg-accent' :'border-muted-foreground'
                  }`}>
                    {selectedOption?.id === option?.id && (
                      <div className="w-full h-full rounded-full bg-accent flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{option?.name}</div>
                    <div className="text-sm text-muted-foreground">{option?.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {option?.price === 0 ? 'Free' : `$${option?.price?.toFixed(2)}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {option?.estimatedDays} days
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Delivery Estimate */}
      {selectedOption && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-muted-foreground">
              Estimated delivery: 
            </span>
            <span className="font-medium text-foreground">
              {new Date(Date.now() + (parseInt(selectedOption.estimatedDays.split('-')[1] || selectedOption.estimatedDays) * 24 * 60 * 60 * 1000))?.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;