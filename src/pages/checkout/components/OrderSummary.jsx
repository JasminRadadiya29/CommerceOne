import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ orderData, isCollapsed, onToggle }) => {
  const { items, subtotal, shipping, tax, total, discount } = orderData;

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingBag" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">
              {isCollapsed ? 'Show order summary' : 'Hide order summary'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">${total}</span>
            <Icon 
              name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </div>
        </button>
      </div>
      {/* Order Summary Content */}
      <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block`}>
        <div className="p-6 space-y-6">
          <div className="hidden lg:block">
            <h3 className="text-lg font-crimson font-semibold text-foreground mb-4">
              Order Summary
            </h3>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            {items?.map((item) => (
              <div key={item?.id} className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {item?.quantity > 1 && (
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item?.quantity}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm leading-tight">
                    {item?.name}
                  </h4>
                  {item?.variant && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item?.variant}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      Qty: {item?.quantity}
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      ${item?.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div className="border-t border-border pt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-4 py-2 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                Apply
              </button>
            </div>
          </div>

          {/* Order Totals */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${subtotal}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? 'Free' : `$${shipping}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-success">-${discount}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">${tax}</span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-semibold text-foreground text-lg">${total}</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Truck" size={14} />
                <span>Free Returns</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Headphones" size={14} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;