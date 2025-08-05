import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StickyProductSummary = ({ product, isVisible, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={product?.mainImage}
            alt={product?.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-medium text-foreground line-clamp-1">
              {product?.name}
            </h4>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary">
                ${product?.price}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={`${
                      i < Math.floor(product?.rating)
                        ? 'text-yellow-400 fill-current' :'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product?.maxQuantity, quantity + 1))}
              className="w-8 h-8"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart({ ...product, quantity })}
            disabled={!product?.inStock}
            iconName="ShoppingCart"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyProductSummary;