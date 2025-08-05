import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import FeaturedCollections from './components/FeaturedCollections';
import CreatorSpotlight from './components/CreatorSpotlight';
import CustomerGallery from './components/CustomerGallery';
import ProductRecommendations from './components/ProductRecommendations';
import NewsletterSignup from './components/NewsletterSignup';
import TrustSignals from './components/TrustSignals';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'CommerceOne - Handcrafted with Intention';
    
    // Track page view for recommendations
    const viewedPages = JSON.parse(localStorage.getItem('viewedPages') || '[]');
    if (!viewedPages?.includes('homepage')) {
      viewedPages?.push('homepage');
      localStorage.setItem('viewedPages', JSON.stringify(viewedPages));
    }

    // Set default viewed categories for recommendations
    const viewedCategories = JSON.parse(localStorage.getItem('viewedCategories') || '[]');
    if (viewedCategories?.length === 0) {
      localStorage.setItem('viewedCategories', JSON.stringify(['Jewelry', 'Ceramics', 'Textiles']));
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Carousel */}
        <HeroCarousel />
        
        {/* Featured Collections Grid */}
        <FeaturedCollections />
        
        {/* Creator Story & Spotlight */}
        <CreatorSpotlight />
        
        {/* Customer Gallery with Instagram Integration */}
        <CustomerGallery />
        
        {/* Intelligent Product Recommendations */}
        <ProductRecommendations />
        
        {/* Trust Signals & Security */}
        <TrustSignals />
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2L28 8v16L16 30L4 24V8L16 2z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 8L22 11v10L16 24L10 21V11L16 8z"
                    fill="var(--color-accent)"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="3"
                    fill="var(--color-background)"
                  />
                </svg>
                <span className="font-crimson font-semibold text-lg">CommerceOne</span>
              </div>
              <p className="text-background/80 text-sm leading-relaxed">
                Handcrafted with intention. Every piece tells a story of artisan mastery and sustainable practices.
              </p>
              <p className="text-background/60 text-xs">
                © {new Date()?.getFullYear()} CommerceOne. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-crimson font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/product-catalog" className="text-background/80 hover:text-background transition-colors">All Products</a></li>
                <li><a href="/product-catalog" className="text-background/80 hover:text-background transition-colors">Jewelry</a></li>
                <li><a href="/product-catalog" className="text-background/80 hover:text-background transition-colors">Ceramics</a></li>
                <li><a href="/product-catalog" className="text-background/80 hover:text-background transition-colors">Textiles</a></li>
                <li><a href="/product-catalog" className="text-background/80 hover:text-background transition-colors">Home Essentials</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="font-crimson font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/customer-account-dashboard" className="text-background/80 hover:text-background transition-colors">My Account</a></li>
                <li><a href="/shopping-cart" className="text-background/80 hover:text-background transition-colors">Shopping Cart</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Returns</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-crimson font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Instagram</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Pinterest</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Newsletter</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Blog</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Press</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-background/60">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Accessibility</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-background/60">Secure payments powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-background/20 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">SSL</span>
                </div>
                <div className="w-8 h-5 bg-background/20 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">256</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;