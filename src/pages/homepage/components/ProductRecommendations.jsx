import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allProducts = [
    {
      id: 1,
      name: "Moonstone Pendant Necklace",
      price: 189,
      originalPrice: 229,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      category: "Jewelry",
      rating: 4.9,
      reviews: 127,
      isNew: true,
      isBestseller: false,
      description: "Handcrafted sterling silver necklace featuring a natural moonstone centerpiece"
    },
    {
      id: 2,
      name: "Artisan Coffee Mug Set",
      price: 68,
      originalPrice: null,
      image: "https://images.pexels.com/photos/4040727/pexels-photo-4040727.jpeg?w=400&h=400&fit=crop",
      category: "Ceramics",
      rating: 4.8,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      description: "Set of 2 handthrown ceramic mugs perfect for your morning ritual"
    },
    {
      id: 3,
      name: "Organic Linen Throw",
      price: 145,
      originalPrice: 180,
      image: "https://images.pixabay.com/photo/2020/10/26/13/58/blanket-5686049_1280.jpg?w=400&h=400&fit=crop",
      category: "Textiles",
      rating: 4.9,
      reviews: 156,
      isNew: false,
      isBestseller: true,
      description: "Luxuriously soft organic linen throw in natural earth tones"
    },
    {
      id: 4,
      name: "Handwoven Basket Collection",
      price: 125,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category: "Home",
      rating: 4.7,
      reviews: 203,
      isNew: true,
      isBestseller: false,
      description: "Set of 3 handwoven baskets perfect for storage and organization"
    },
    {
      id: 5,
      name: "Rose Gold Stacking Rings",
      price: 95,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      category: "Jewelry",
      rating: 4.8,
      reviews: 178,
      isNew: false,
      isBestseller: true,
      description: "Delicate rose gold rings designed to be worn together or separately"
    },
    {
      id: 6,
      name: "Ceramic Planter Trio",
      price: 95,
      originalPrice: null,
      image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?w=400&h=400&fit=crop",
      category: "Ceramics",
      rating: 4.9,
      reviews: 134,
      isNew: true,
      isBestseller: false,
      description: "Set of 3 handcrafted ceramic planters in graduated sizes"
    }
  ];

  useEffect(() => {
    // Simulate intelligent recommendations based on browsing behavior
    const getRecommendations = () => {
      const viewedCategories = JSON.parse(localStorage.getItem('viewedCategories') || '["Jewelry", "Ceramics"]');
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Filter products based on viewed categories and cart items
      let filtered = allProducts?.filter(product => 
        viewedCategories?.includes(product?.category) || 
        product?.isBestseller || 
        product?.isNew
      );
      
      // Remove items already in cart
      filtered = filtered?.filter(product => 
        !cartItems?.some(cartItem => cartItem?.id === product?.id)
      );
      
      // Sort by rating and bestseller status
      filtered?.sort((a, b) => {
        if (a?.isBestseller && !b?.isBestseller) return -1;
        if (!a?.isBestseller && b?.isBestseller) return 1;
        return b?.rating - a?.rating;
      });
      
      return filtered?.slice(0, 6);
    };

    setRecommendations(getRecommendations());
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart?.find(item => item?.id === product?.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart?.push({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        category: product?.category,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= recommendations?.length ? 0 : prev + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, recommendations?.length - 3) : prev - 3
    );
  };

  if (recommendations?.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-accent mb-2">
              <Icon name="Sparkles" size={20} />
              <span className="text-sm font-medium uppercase tracking-wide">Recommended For You</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground">
              Curated Just For You
            </h2>
            <p className="text-muted-foreground mt-2">
              Based on your interests and our bestsellers
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 flex items-center justify-center"
              disabled={currentIndex === 0}
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 flex items-center justify-center"
              disabled={currentIndex + 3 >= recommendations?.length}
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {recommendations?.map((product) => (
              <div key={product?.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                <div className="group bg-card rounded-xl overflow-hidden gallery-shadow hover:warm-shadow transition-all duration-500">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Link to="/product-detail">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product?.isNew && (
                        <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                      {product?.isBestseller && (
                        <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Bestseller
                        </span>
                      )}
                      {product?.originalPrice && (
                        <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => addToCart(product)}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-accent font-medium uppercase tracking-wide">
                        {product?.category}
                      </span>
                      <Link to="/product-detail">
                        <h3 className="text-lg font-crimson font-semibold text-foreground mt-1 hover:text-accent transition-colors">
                          {product?.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {product?.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon 
                            key={star} 
                            name="Star" 
                            size={14} 
                            className={`${
                              star <= Math.floor(product?.rating) 
                                ? 'text-accent fill-current' :'text-muted-foreground'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product?.rating} ({product?.reviews})
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold text-foreground">
                          ${product?.price}
                        </span>
                        {product?.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product?.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="hover:bg-accent hover:text-accent-foreground hover:border-accent"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {Array.from({ length: Math.ceil(recommendations?.length / 3) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index 
                  ? 'bg-accent scale-125' :'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/product-catalog">
            <Button variant="default" size="lg" className="px-8">
              View All Products
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;