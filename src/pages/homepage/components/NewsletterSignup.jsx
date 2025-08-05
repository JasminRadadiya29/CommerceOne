import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: "Sparkles",
      title: "Exclusive Access",
      description: "Be the first to see new collections and limited editions"
    },
    {
      icon: "Tag",
      title: "Special Offers",
      description: "Subscriber-only discounts and early bird pricing"
    },
    {
      icon: "BookOpen",
      title: "Behind the Scenes",
      description: "Stories from the workshop and crafting process insights"
    },
    {
      icon: "Calendar",
      title: "Event Invites",
      description: "Virtual studio tours and exclusive crafting workshops"
    }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store subscription in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers?.includes(email)) {
        subscribers?.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      }
      
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-background rounded-2xl p-12 gallery-shadow">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-3xl font-crimson font-semibold text-foreground mb-4">
              Welcome to Our Community!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for subscribing. You'll receive your first exclusive update within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                onClick={() => setIsSubscribed(false)}
                className="px-6"
              >
                Subscribe Another Email
              </Button>
              <Button variant="outline" className="px-6">
                Follow on Instagram
                <Icon name="Instagram" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-2xl overflow-hidden gallery-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-accent mb-4">
                    <Icon name="Mail" size={20} />
                    <span className="text-sm font-medium uppercase tracking-wide">Newsletter</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground mb-4">
                    Join Our Crafted Community
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Get exclusive access to new collections, behind-the-scenes stories, and special offers crafted just for our community.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name={benefit?.icon} size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm mb-1">
                          {benefit?.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {benefit?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5]?.map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center">
                        <Icon name="User" size={12} className="text-accent" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">2,500+ subscribers</p>
                    <p className="text-xs text-muted-foreground">Join our growing community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-muted/30 p-8 lg:p-12 flex items-center">
              <div className="w-full space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-crimson font-semibold text-foreground mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your email below and join thousands of craft enthusiasts.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    error={error}
                    required
                    className="w-full"
                  />

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    loading={isLoading}
                    fullWidth
                    className="font-medium"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                    {!isLoading && <Icon name="ArrowRight" size={16} className="ml-2" />}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                    <br />
                    We respect your privacy and never share your information.
                  </p>
                </form>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-accent" />
                    <span className="text-xs text-muted-foreground">Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Lock" size={16} className="text-accent" />
                    <span className="text-xs text-muted-foreground">Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="UserX" size={16} className="text-accent" />
                    <span className="text-xs text-muted-foreground">No Spam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;