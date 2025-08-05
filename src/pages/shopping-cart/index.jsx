import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedForLater from './components/SavedForLater';
import ShippingCalculator from './components/ShippingCalculator';
import RecentlyViewed from './components/RecentlyViewed';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug - Morning Ritual Collection",
      price: 24.99,
      originalPrice: 29.99,
      quantity: 2,
      color: "Sage Green",
      size: "12oz",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      inStock: true
    },
    {
      id: 2,
      name: "Artisan Leather Journal with Hand-Stitched Binding",
      price: 45.00,
      quantity: 1,
      color: "Cognac Brown",
      size: "A5",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      inStock: true
    },
    {
      id: 3,
      name: "Organic Cotton Tote Bag - Sustainable Living Series",
      price: 18.50,
      originalPrice: 22.00,
      quantity: 1,
      color: "Natural",
      size: "Large",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      inStock: false
    }
  ];

  const mockSavedItems = [
    {
      id: 8,
      name: "Hand-Blown Glass Vase",
      price: 78.00,
      originalPrice: 95.00,
      color: "Amber",
      size: "Medium",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      inStock: true
    },
    {
      id: 9,
      name: "Woven Basket Set",
      price: 65.00,
      color: "Natural",
      size: "Set of 3",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      inStock: true
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setCartItems(mockCartItems);
      setSavedItems(mockSavedItems);
      calculateTax(mockCartItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  const calculateTax = (items) => {
    const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    setTax(subtotal * 0.08); // 8% tax rate
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTax(updatedItems);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedItems);
    calculateTax(updatedItems);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems?.find(item => item?.id === itemId);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      handleRemoveItem(itemId);
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems?.find(item => item?.id === itemId);
    if (itemToMove) {
      const updatedCartItems = [...cartItems, { ...itemToMove, quantity: 1 }];
      setCartItems(updatedCartItems);
      setSavedItems(savedItems?.filter(item => item?.id !== itemId));
      calculateTax(updatedCartItems);
      
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
  };

  const handleRemoveSavedItem = (itemId) => {
    setSavedItems(savedItems?.filter(item => item?.id !== itemId));
  };

  const handleApplyPromoCode = (code, discountAmount) => {
    setAppliedPromoCode(code);
    setDiscount(discountAmount);
  };

  const handleShippingUpdate = (shippingOption) => {
    setShipping(shippingOption?.price);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems?.find(cartItem => cartItem?.id === item?.id);
    
    if (existingItem) {
      handleUpdateQuantity(item?.id, existingItem?.quantity + 1);
    } else {
      const updatedItems = [...cartItems, item];
      setCartItems(updatedItems);
      calculateTax(updatedItems);
      
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart - CommerceOne</title>
        <meta name="description" content="Review and manage items in your shopping cart. Secure checkout with multiple payment options." />
      </Helmet>
      
      <Header />
      
      {isLoading ? (
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-accent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      ) : cartItems?.length === 0 ? (
        <div className="pt-16">
          <EmptyCart />
        </div>
      ) : (
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-crimson font-semibold text-foreground mb-2">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>

                {/* Shipping Calculator */}
                <ShippingCalculator onShippingUpdate={handleShippingUpdate} />

                {/* Saved for Later */}
                <SavedForLater
                  items={savedItems}
                  onMoveToCart={handleMoveToCart}
                  onRemove={handleRemoveSavedItem}
                />

                {/* Recently Viewed */}
                <RecentlyViewed onAddToCart={handleAddToCart} />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  items={cartItems}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  onApplyPromoCode={handleApplyPromoCode}
                />
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => window.history?.back()}
              >
                Continue Shopping
              </Button>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>
                  Your cart is secured with SSL encryption. All transactions are protected.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;