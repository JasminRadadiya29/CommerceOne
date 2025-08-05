import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onWishlistToggle, onQuickView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);

  const handleWishlistClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(product?.id, !isWishlisted);
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onQuickView(product);
  };

  const addToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart?.find(item => item?.id === product?.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart?.push({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.images?.[0],
        quantity: 1,
        color: product?.colors?.[0]?.name || 'Default',
        size: product?.sizes?.[0] || 'One Size'
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : index < rating ? "StarHalf" : "Star"}
        size={14}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-warm transition-all duration-300 tactile-hover">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to="/product-detail" state={{ product }}>
          <Image
            src={product?.images?.[currentImageIndex]}
            alt={product?.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Icon
            name="Heart"
            size={18}
            className={`transition-colors ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-muted-foreground hover:text-red-500'
            }`}
          />
        </button>

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute top-3 left-3 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          Quick View
        </button>

        {/* Sale Badge */}
        {product?.isOnSale && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
            Sale
          </div>
        )}

        {/* New Badge */}
        {product?.isNew && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
            New
          </div>
        )}

        {/* Image Navigation Dots */}
        {product?.images?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {product?.images?.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e?.preventDefault();
                  e?.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-accent' : 'bg-background/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <Link to="/product-detail" state={{ product }}>
          <h3 className="font-crimson font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-semibold text-lg text-foreground">
            ${product?.price}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product?.colors && product?.colors?.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">Colors:</span>
            <div className="flex space-x-1">
              {product?.colors?.slice(0, 4)?.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color?.hex }}
                  title={color?.name}
                />
              ))}
              {product?.colors?.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{product?.colors?.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={addToCart}
          variant="outline"
          size="sm"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;