import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PersonalizedRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      name: "Artisan Coffee Mug",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop",
      price: 34.99,
      originalPrice: 39.99,
      reason: "Based on your ceramic purchases",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Handwoven Table Runner",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      price: 78.99,
      originalPrice: 78.99,
      reason: "Complements your home decor style",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Organic Beeswax Candles",
      image: "https://images.unsplash.com/photo-1602874801006-e26c884e5a8a?w=300&h=300&fit=crop",
      price: 29.99,
      originalPrice: 35.99,
      reason: "Frequently bought together",
      rating: 4.7,
      reviews: 156
    }
  ];

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart?.findIndex(cartItem => cartItem?.id === product?.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart?.push({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    console.log(`Added ${product?.name} to cart`);
  };

  const handleAddToWishlist = (product) => {
    console.log(`Added ${product?.name} to wishlist`);
    // Add wishlist logic here
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-crimson font-semibold text-foreground">
          Recommended for You
        </h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations?.map((product) => (
          <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-warm transition-all duration-300">
            <div className="relative">
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {product?.originalPrice > product?.price && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Sale
                  </span>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => handleAddToWishlist(product)}
                iconName="Heart"
              />
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                  {product?.reason}
                </span>
              </div>

              <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                {product?.name}
              </h3>

              <div className="flex items-center space-x-1 mb-2">
                {renderStars(product?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product?.reviews})
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-semibold text-foreground">
                  ${product?.price}
                </span>
                {product?.originalPrice > product?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => console.log(`View ${product?.name}`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button variant="outline" iconName="ArrowRight" iconPosition="right">
          View More Recommendations
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;