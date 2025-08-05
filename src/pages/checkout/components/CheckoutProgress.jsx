import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Information', icon: 'User' },
    { id: 2, name: 'Shipping', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Review', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step?.id <= currentStep
                    ? 'bg-accent border-accent text-accent-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}
              >
                <Icon name={step?.icon} size={18} />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step?.id <= currentStep ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {step?.name}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  step?.id < currentStep ? 'bg-accent' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;