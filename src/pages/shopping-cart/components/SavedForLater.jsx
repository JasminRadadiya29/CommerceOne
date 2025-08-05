import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SavedForLater = ({ items, onMoveToCart, onRemove }) => {
  if (items?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Saved for Later ({items?.length})
        </h2>
        <Icon name="Heart" size={20} className="text-accent" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 group">
            <Link to={`/product-detail?id=${item?.id}`} className="block mb-3">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="space-y-2">
              <Link 
                to={`/product-detail?id=${item?.id}`}
                className="font-medium text-foreground hover:text-accent transition-colors duration-200 line-clamp-2"
              >
                {item?.name}
              </Link>

              {/* Product Options */}
              {(item?.color || item?.size) && (
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {item?.color && (
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: item?.color?.toLowerCase() }}
                      />
                      <span className="capitalize">{item?.color}</span>
                    </div>
                  )}
                  {item?.size && (
                    <span>Size: {item?.size}</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  ${item?.price?.toFixed(2)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {item?.inStock ? (
                  <span className="inline-flex items-center gap-1 text-sm text-success">
                    <Icon name="Check" size={12} />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-destructive">
                    <Icon name="AlertCircle" size={12} />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMoveToCart(item?.id)}
                  disabled={!item?.inStock}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="flex-1"
                >
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item?.id)}
                  iconName="Trash2"
                  className="text-muted-foreground hover:text-destructive"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;