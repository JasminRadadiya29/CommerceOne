import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentlyViewed = ({ onAddToCart }) => {
  const recentlyViewedItems = [
    {
      id: 4,
      name: "Handwoven Wool Scarf",
      price: 68.00,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 78,
      inStock: true
    },
    {
      id: 5,
      name: "Artisan Wooden Bowl Set",
      price: 95.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 45,
      inStock: true
    },
    {
      id: 6,
      name: "Hand-Forged Copper Bracelet",
      price: 42.50,
      originalPrice: 55.00,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 92,
      inStock: false
    },
    {
      id: 7,
      name: "Organic Linen Pillowcase Set",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 134,
      inStock: true
    }
  ];

  const handleAddToCart = (item) => {
    onAddToCart({
      ...item,
      quantity: 1,
      color: 'Natural',
      size: 'One Size'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recently Viewed</h2>
        <Icon name="Eye" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentlyViewedItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg overflow-hidden group hover:shadow-warm transition-all duration-300">
            <Link to={`/product-detail?id=${item?.id}`} className="block">
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link 
                to={`/product-detail?id=${item?.id}`}
                className="font-medium text-foreground hover:text-accent transition-colors duration-200 line-clamp-2 mb-2"
              >
                {item?.name}
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(item?.rating) ? "text-accent fill-current" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({item?.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
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
              <div className="mb-3">
                {item?.inStock ? (
                  <span className="inline-flex items-center gap-1 text-xs text-success">
                    <Icon name="Check" size={10} />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-destructive">
                    <Icon name="AlertCircle" size={10} />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(item)}
                disabled={!item?.inStock}
                iconName="Plus"
                iconPosition="left"
              >
                {item?.inStock ? 'Add to Cart' : 'Notify Me'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* View All Link */}
      <div className="text-center mt-6">
        <Button
          variant="ghost"
          iconName="ArrowRight"
          iconPosition="right"
          asChild
        >
          <Link to="/product-catalog">View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentlyViewed;