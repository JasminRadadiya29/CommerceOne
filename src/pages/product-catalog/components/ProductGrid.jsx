import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onWishlistToggle, onQuickView, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.65a1 1 0 0 0 .7 1.35H19M7 13v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
          </svg>
        </div>
        <h3 className="font-crimson font-semibold text-xl text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our full collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onWishlistToggle={onWishlistToggle}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;