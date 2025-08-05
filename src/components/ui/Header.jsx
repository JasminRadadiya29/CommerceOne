import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart?.reduce((total, item) => total + (item?.quantity || 1), 0));
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Shop', path: '/product-catalog', icon: 'Store' },
    { name: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart', badge: cartCount },
    { name: 'Account', path: '/customer-account-dashboard', icon: 'User' }
  ];

  const secondaryItems = [
    { name: 'Checkout', path: '/checkout', icon: 'CreditCard' }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleCartClick = () => {
    // Update cart count when cart is accessed
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart?.reduce((total, item) => total + (item?.quantity || 1), 0));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2 group">
            <div className="relative">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <path
                  d="M16 2L28 8v16L16 30L4 24V8L16 2z"
                  fill="var(--color-primary)"
                  className="transition-colors duration-300"
                />
                <path
                  d="M16 8L22 11v10L16 24L10 21V11L16 8z"
                  fill="var(--color-accent)"
                  className="transition-colors duration-300"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="3"
                  fill="var(--color-background)"
                  className="transition-colors duration-300"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-crimson font-semibold text-lg text-primary breathing-text">
                CommerceOne
              </span>
              <span className="font-mono text-xs text-muted-foreground -mt-1">
                Crafted with intention
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={item?.name === 'Cart' ? handleCartClick : undefined}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'text-accent bg-accent/10' :'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
                {item?.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                iconName="MoreHorizontal"
                className="text-muted-foreground hover:text-foreground"
              >
                More
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-warm py-2 z-50">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            iconName={isMenuOpen ? "X" : "Menu"}
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <nav className="px-4 py-4 space-y-2">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item?.name === 'Cart') handleCartClick();
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </div>
                  {item?.badge > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;