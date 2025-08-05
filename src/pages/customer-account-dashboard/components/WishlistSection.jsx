import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Vintage Leather Journal",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
      price: 89.99,
      originalPrice: 109.99,
      inStock: true,
      priceDropped: true,
      addedDate: "2024-07-20"
    },
    {
      id: 2,
      name: "Handcrafted Wooden Bowl Set",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      price: 159.99,
      originalPrice: 159.99,
      inStock: false,
      priceDropped: false,
      addedDate: "2024-07-15"
    },
    {
      id: 3,
      name: "Artisan Candle Collection",
      image: "https://images.unsplash.com/photo-1602874801006-e26c884e5a8a?w=300&h=300&fit=crop",
      price: 45.99,
      originalPrice: 45.99,
      inStock: true,
      priceDropped: false,
      addedDate: "2024-07-10"
    }
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(items => items?.filter(item => item?.id !== itemId));
  };

  const handleAddToCart = (item) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart?.findIndex(cartItem => cartItem?.id === item?.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart?.push({
        id: item?.id,
        name: item?.name,
        price: item?.price,
        image: item?.image,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Remove from wishlist after adding to cart
    handleRemoveFromWishlist(item?.id);
    
    console.log(`Added ${item?.name} to cart`);
  };

  const handleNotifyWhenAvailable = (itemId) => {
    console.log(`Setting up notification for item ${itemId}`);
    // Add notification logic here
  };

  return (
    <div id="wishlist" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-crimson font-semibold text-foreground">
          My Wishlist
        </h2>
        <div className="text-sm text-muted-foreground">
          {wishlistItems?.length} item{wishlistItems?.length !== 1 ? 's' : ''}
        </div>
      </div>
      {wishlistItems?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-warm transition-shadow duration-300">
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-muted">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {item?.priceDropped && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Price Drop!
                    </span>
                  )}
                  {!item?.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                  onClick={() => handleRemoveFromWishlist(item?.id)}
                  iconName="X"
                />
              </div>

              <div className="p-4">
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                  {item?.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-semibold text-foreground">
                    ${item?.price}
                  </span>
                  {item?.originalPrice > item?.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${item?.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  Added on {new Date(item.addedDate)?.toLocaleDateString()}
                </p>

                <div className="space-y-2">
                  {item?.inStock ? (
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Bell"
                      iconPosition="left"
                      onClick={() => handleNotifyWhenAvailable(item?.id)}
                    >
                      Notify When Available
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Save items you love for later by clicking the heart icon
          </p>
          <Button variant="default" iconName="ShoppingBag" iconPosition="left">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;