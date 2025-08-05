import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';


const RecentlyViewed = ({ products }) => {
  if (!products || products?.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-crimson font-semibold text-primary mb-4">
        Recently Viewed
      </h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-detail?id=${product?.id}`}
            className="flex-shrink-0 group"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden mb-2">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-20">
              <h4 className="text-xs font-medium text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-1">
                {product?.name}
              </h4>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-primary">
                  ${product?.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;