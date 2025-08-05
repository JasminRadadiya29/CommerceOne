import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateQuantity(item?.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link to={`/product-detail?id=${item?.id}`} className="block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <Link 
              to={`/product-detail?id=${item?.id}`}
              className="font-medium text-foreground hover:text-accent transition-colors duration-200 line-clamp-2"
            >
              {item?.name}
            </Link>
            
            {/* Product Options */}
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              {item?.color && (
                <div className="flex items-center gap-1">
                  <span>Color:</span>
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: item?.color?.toLowerCase() }}
                  />
                  <span className="capitalize">{item?.color}</span>
                </div>
              )}
              {item?.size && (
                <div className="flex items-center gap-1">
                  <span>Size:</span>
                  <span className="font-medium">{item?.size}</span>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {item?.inStock ? (
                <span className="inline-flex items-center gap-1 text-sm text-success">
                  <Icon name="Check" size={14} />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm text-destructive">
                  <Icon name="AlertCircle" size={14} />
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              ${(item?.price * quantity)?.toFixed(2)}
            </div>
            {item?.originalPrice && item?.originalPrice > item?.price && (
              <div className="text-sm text-muted-foreground line-through">
                ${(item?.originalPrice * quantity)?.toFixed(2)}
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              ${item?.price?.toFixed(2)} each
            </div>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Qty:</span>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="h-8 w-8 p-0"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <div className="flex items-center justify-center w-12 h-8 text-sm font-medium">
                {isUpdating ? (
                  <Icon name="Loader2" size={14} className="animate-spin" />
                ) : (
                  quantity
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10 || isUpdating}
                className="h-8 w-8 p-0"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveForLater}
              iconName="Heart"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Save for Later
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              iconName="Trash2"
              iconPosition="left"
              className="text-muted-foreground hover:text-destructive"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;