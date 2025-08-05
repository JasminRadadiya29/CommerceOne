import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CheckoutProgress from './components/CheckoutProgress';
import InformationForm from './components/InformationForm';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(true);
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    createAccount: false,
    newsletter: false,
    
    // Shipping Information
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    shippingMethod: '',
    shippingCost: 0,
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  const [orderSummary] = useState({
    items: [
      {
        id: 1,
        name: "Artisan Ceramic Mug",
        variant: "Midnight Blue, Large",
        quantity: 2,
        price: "89.98",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        name: "Handwoven Wool Scarf",
        variant: "Forest Green",
        quantity: 1,
        price: "124.00",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Leather Journal Set",
        variant: "Cognac Brown",
        quantity: 1,
        price: "78.50",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop"
      }
    ],
    subtotal: "292.48",
    shipping: 0,
    tax: "23.40",
    discount: 0,
    total: "315.88"
  });

  useEffect(() => {
    // Check if cart is empty and redirect
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart?.length === 0 && !isOrderComplete) {
      navigate('/shopping-cart');
    }
  }, [navigate, isOrderComplete]);

  useEffect(() => {
    // Update shipping cost in order summary when shipping method changes
    if (formData?.shippingCost !== undefined) {
      const newTotal = (parseFloat(orderSummary?.subtotal) + 
      formData?.shippingCost + 
      parseFloat(orderSummary?.tax) - orderSummary?.discount)?.toFixed(2);
      
      orderSummary.shipping = formData?.shippingCost;
      orderSummary.total = newTotal;
    }
  }, [formData?.shippingCost, orderSummary]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setIsSummaryCollapsed(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsSummaryCollapsed(true);
    }
  };

  const handleOrderComplete = () => {
    setIsOrderComplete(true);
    // Clear cart
    localStorage.removeItem('cart');
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <InformationForm
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ShippingForm
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <PaymentForm
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <OrderReview
            onBack={handleBack}
            onComplete={handleOrderComplete}
            formData={formData}
            orderSummary={orderSummary}
          />
        );
      default:
        return null;
    }
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <OrderConfirmation orderData={{ ...formData, ...orderSummary }} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Checkout Forms */}
            <div className="lg:col-span-1">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <CheckoutProgress currentStep={currentStep} />
                {renderCurrentStep()}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <OrderSummary
                  orderData={orderSummary}
                  isCollapsed={isSummaryCollapsed}
                  onToggle={() => setIsSummaryCollapsed(!isSummaryCollapsed)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Exit Intent Overlay */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <div className="bg-card border border-border rounded-lg shadow-warm p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-warning text-sm">⚡</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                Secure Checkout
              </h4>
              <p className="text-xs text-muted-foreground">
                Your information is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;