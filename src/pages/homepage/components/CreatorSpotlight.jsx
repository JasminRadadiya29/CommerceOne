import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CreatorSpotlight = () => {
  const creatorInfo = {
    name: "Elena Rodriguez",
    title: "Master Artisan & Founder",
    image: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8c5?w=400&h=400&fit=crop",
    story: `With over 15 years of experience in traditional craftsmanship, I believe that every piece should tell a story. My journey began in a small workshop in Barcelona, where I learned the ancient techniques that I now blend with contemporary design. Each creation is a reflection of my commitment to sustainable practices and timeless beauty.`,
    achievements: [
      "Featured in Artisan Quarterly Magazine",
      "Winner of International Craft Excellence Award 2023",
      "Sustainable Design Advocate",
      "15+ Years of Master Craftsmanship"
    ],
    philosophy: "Every piece is crafted with intention, designed to be treasured for generations.",
    workshopImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
    stats: {
      yearsExperience: 15,
      piecesCrafted: "2,500+",
      happyCustomers: "1,200+",
      sustainabilityRating: "100%"
    }
  };

  return (
    <section className="py-20 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Creator Image & Workshop */}
          <div className="space-y-6">
            {/* Main Creator Photo */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden gallery-shadow">
                <Image
                  src={creatorInfo?.image}
                  alt={creatorInfo?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Workshop Image */}
              <div className="absolute -bottom-6 -right-6 w-48 h-32 rounded-xl overflow-hidden warm-shadow border-4 border-background">
                <Image
                  src={creatorInfo?.workshopImage}
                  alt="Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="text-center p-4 bg-background rounded-lg gallery-shadow">
                <div className="text-2xl font-crimson font-semibold text-accent mb-1">
                  {creatorInfo?.stats?.yearsExperience}+
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg gallery-shadow">
                <div className="text-2xl font-crimson font-semibold text-accent mb-1">
                  {creatorInfo?.stats?.piecesCrafted}
                </div>
                <div className="text-sm text-muted-foreground">Pieces Crafted</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg gallery-shadow">
                <div className="text-2xl font-crimson font-semibold text-accent mb-1">
                  {creatorInfo?.stats?.happyCustomers}
                </div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg gallery-shadow">
                <div className="text-2xl font-crimson font-semibold text-accent mb-1">
                  {creatorInfo?.stats?.sustainabilityRating}
                </div>
                <div className="text-sm text-muted-foreground">Sustainable</div>
              </div>
            </div>
          </div>

          {/* Creator Story Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Sparkles" size={20} />
                <span className="text-sm font-medium uppercase tracking-wide">Creator Spotlight</span>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground mb-2">
                  Meet {creatorInfo?.name}
                </h2>
                <p className="text-lg text-accent font-medium">
                  {creatorInfo?.title}
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {creatorInfo?.story}
              </p>

              {/* Philosophy Quote */}
              <blockquote className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg">
                <p className="text-foreground font-crimson text-lg italic">
                  "{creatorInfo?.philosophy}"
                </p>
              </blockquote>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-xl font-crimson font-semibold text-foreground">
                Recognition & Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {creatorInfo?.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/customer-account-dashboard">
                <Button variant="default" size="lg" className="px-8">
                  Read Full Story
                  <Icon name="BookOpen" size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/product-catalog">
                <Button variant="outline" size="lg" className="px-8">
                  View My Work
                  <Icon name="Eye" size={18} className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center">
                      <Icon name="User" size={14} className="text-accent" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Trusted by 1,200+ customers
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon key={star} name="Star" size={16} className="text-accent fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSpotlight;