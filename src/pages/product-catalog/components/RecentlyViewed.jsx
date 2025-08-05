import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Mock recently viewed products
    const mockRecentProducts = [
      {
        id: 'recent-1',
        name: 'Artisan Ceramic Mug',
        price: 28,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop'
      },
      {
        id: 'recent-2',
        name: 'Handwoven Wool Scarf',
        price: 85,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop'
      },
      {
        id: 'recent-3',
        name: 'Leather Journal',
        price: 45,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop'
      }
    ];
    
    setRecentProducts(mockRecentProducts);
  }, []);

  if (recentProducts?.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className={`bg-card border border-border rounded-lg shadow-warm transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-12'
      }`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center justify-center hover:bg-muted transition-colors rounded-t-lg"
        >
          <Icon 
            name={isExpanded ? "ChevronRight" : "Clock"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-border">
            <h3 className="font-medium text-foreground mb-3 text-sm">Recently Viewed</h3>
            <div className="space-y-3">
              {recentProducts?.map((product) => (
                <Link
                  key={product?.id}
                  to="/product-detail"
                  state={{ product }}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {product?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${product?.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            <button
              onClick={() => setRecentProducts([])}
              className="w-full mt-3 pt-3 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;