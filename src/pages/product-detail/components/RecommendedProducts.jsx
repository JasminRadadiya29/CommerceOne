import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ products, title = "Others Also Viewed" }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">
          {title}
        </h3>
        <Button variant="ghost" size="sm" iconName="ArrowRight">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-detail?id=${product?.id}`}
            className="group block"
          >
            <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square mb-3 relative">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product?.isNew && (
                <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  New
                </span>
              )}
              {product?.discount && (
                <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  -{product?.discount}%
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                {product?.name}
              </h4>
              
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
                <span className="text-xs text-muted-foreground ml-1">
                  ({product?.reviewCount})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-primary">
                  ${product?.price}
                </span>
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;