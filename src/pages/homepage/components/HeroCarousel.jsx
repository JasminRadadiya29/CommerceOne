import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop",
      title: "Handcrafted Jewelry Collection",
      subtitle: "Each piece tells a story of artisan mastery",
      description: "Discover our signature collection of handcrafted jewelry, where traditional techniques meet contemporary design.",
      cta: "Shop Jewelry",
      category: "jewelry"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg?w=1200&h=800&fit=crop",
      title: "Artisan Ceramics Studio",
      subtitle: "Functional art for modern living",
      description: "Transform your space with our curated collection of handthrown ceramics, perfect for contemporary homes.",
      cta: "Explore Ceramics",
      category: "ceramics"
    },
    {
      id: 3,
      image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=1200&h=800&fit=crop",
      title: "Luxury Textile Collection",
      subtitle: "Sustainable fashion with timeless appeal",
      description: "Experience the finest handwoven textiles, crafted using sustainable materials and time-honored techniques.",
      cta: "Shop Textiles",
      category: "textiles"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-muted">
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides?.map((slide) => (
          <div key={slide?.id} className="relative w-full h-full flex-shrink-0">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide?.image}
                alt={slide?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className="space-y-6 text-white">
                    <div className="space-y-2">
                      <p className="text-sm font-medium tracking-wide uppercase opacity-90">
                        {slide?.subtitle}
                      </p>
                      <h1 className="text-4xl md:text-6xl font-crimson font-semibold leading-tight">
                        {slide?.title}
                      </h1>
                    </div>
                    
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-xl">
                      {slide?.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link to="/product-catalog">
                        <Button 
                          variant="default" 
                          size="lg"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
                        >
                          {slide?.cta}
                        </Button>
                      </Link>
                      <Link to="/customer-account-dashboard">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-white text-white hover:bg-white hover:text-foreground font-medium px-8"
                        >
                          Discover My Story
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Tagline Overlay */}
      <div className="absolute bottom-20 left-4 sm:left-8 z-20">
        <p className="text-white/90 font-crimson text-lg italic">
          "Crafted with intention"
        </p>
      </div>
    </div>
  );
};

export default HeroCarousel;