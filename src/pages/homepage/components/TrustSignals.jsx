import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: "Shield",
      title: "Secure Payments",
      description: "256-bit SSL encryption protects your personal and payment information",
      details: "Powered by Stripe & PayPal"
    },
    {
      icon: "RotateCcw",
      title: "30-Day Returns",
      description: "Not completely satisfied? Return any item within 30 days for a full refund",
      details: "Free return shipping"
    },
    {
      icon: "Truck",
      title: "Free Shipping",
      description: "Complimentary shipping on all orders over $75 within the continental US",
      details: "2-3 business days"
    },
    {
      icon: "Award",
      title: "Lifetime Warranty",
      description: "We stand behind our craftsmanship with lifetime repair services",
      details: "Handcrafted quality guaranteed"
    }
  ];

  const securityBadges = [
    {
      name: "SSL Secured",
      icon: "Lock",
      description: "Your data is protected"
    },
    {
      name: "Verified Business",
      icon: "BadgeCheck",
      description: "BBB Accredited"
    },
    {
      name: "Secure Payments",
      icon: "CreditCard",
      description: "Stripe & PayPal protected"
    },
    {
      name: "Privacy Protected",
      icon: "Eye",
      description: "We never share your data"
    }
  ];

  const customerStats = [
    {
      number: "4.9",
      label: "Average Rating",
      sublabel: "Based on 1,200+ reviews",
      icon: "Star"
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      sublabel: "Would recommend to friends",
      icon: "Heart"
    },
    {
      number: "2,500+",
      label: "Happy Customers",
      sublabel: "Worldwide community",
      icon: "Users"
    },
    {
      number: "15+",
      label: "Years Experience",
      sublabel: "Master craftsmanship",
      icon: "Award"
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-accent mb-4">
            <Icon name="ShieldCheck" size={20} />
            <span className="text-sm font-medium uppercase tracking-wide">Trust & Quality</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground mb-4">
            Shop with Complete Confidence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your satisfaction and security are our top priorities. Here's why thousands of customers trust CommerceOne.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures?.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon name={feature?.icon} size={28} className="text-accent" />
              </div>
              <h3 className="text-lg font-crimson font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                {feature?.description}
              </p>
              <p className="text-accent text-xs font-medium">
                {feature?.details}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Stats */}
        <div className="bg-background rounded-2xl p-8 gallery-shadow mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {customerStats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name={stat?.icon} size={20} className="text-accent" />
                  <span className="text-3xl font-crimson font-semibold text-foreground">
                    {stat?.number}
                  </span>
                </div>
                <p className="font-medium text-foreground text-sm mb-1">
                  {stat?.label}
                </p>
                <p className="text-muted-foreground text-xs">
                  {stat?.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="bg-background rounded-2xl p-8 gallery-shadow">
          <div className="text-center mb-8">
            <h3 className="text-xl font-crimson font-semibold text-foreground mb-2">
              Your Security is Our Priority
            </h3>
            <p className="text-muted-foreground">
              We use industry-leading security measures to protect your information
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {securityBadges?.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-muted/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Icon name={badge?.icon} size={20} className="text-accent" />
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {badge?.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {badge?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Trust Elements */}
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Made in USA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Leaf" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Eco-Friendly</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Trusted by:</span>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                    <Icon name="Star" size={14} className="text-accent" />
                  </div>
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                    <Icon name="Award" size={14} className="text-accent" />
                  </div>
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                    <Icon name="Shield" size={14} className="text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Highlight */}
        <div className="mt-12 text-center">
          <div className="bg-accent/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon key={star} name="Star" size={20} className="text-accent fill-current" />
              ))}
            </div>
            <blockquote className="text-lg font-crimson text-foreground mb-4">
              "The quality is exceptional and the customer service is outstanding. I've been a customer for 3 years and every purchase has exceeded my expectations."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Sarah Johnson</p>
                <p className="text-muted-foreground text-xs">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;