import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import ActiveFilters from './components/ActiveFilters';
import QuickViewModal from './components/QuickViewModal';
import RecentlyViewed from './components/RecentlyViewed';
import BackToTop from './components/BackToTop';

import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 'prod-1',
      name: 'Artisan Ceramic Coffee Mug',
      price: 28,
      originalPrice: 35,
      rating: 4.8,
      reviewCount: 124,
      images: [
        'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#1E3A8A' }
      ],
      sizes: ['Small', 'Medium', 'Large'],
      isNew: true,
      isOnSale: true,
      category: 'Home & Living',
      material: 'Ceramic',
      description: `Handcrafted ceramic mug with a smooth glaze finish. Perfect for your morning coffee or evening tea. Each piece is unique with slight variations that add to its artisan charm.`,
      features: ['Dishwasher safe', 'Microwave safe', 'Lead-free glaze', 'Handmade']
    },
    {
      id: 'prod-2',
      name: 'Handwoven Wool Scarf',
      price: 85,
      rating: 4.6,
      reviewCount: 89,
      images: [
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'Gray', hex: '#6B7280' },
        { name: 'Brown', hex: '#92400E' },
        { name: 'Beige', hex: '#F5F5DC' }
      ],
      sizes: ['One Size'],
      isNew: false,
      isOnSale: false,
      category: 'Fashion',
      material: 'Wool',
      description: `Luxuriously soft wool scarf handwoven by skilled artisans. The perfect accessory for any season, offering both warmth and style.`,
      features: ['100% Merino wool', 'Handwoven', 'Naturally water-resistant', 'Hypoallergenic']
    },
    {
      id: 'prod-3',
      name: 'Leather Bound Journal',
      price: 45,
      rating: 4.9,
      reviewCount: 156,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'Brown', hex: '#92400E' },
        { name: 'Black', hex: '#000000' }
      ],
      sizes: ['A5', 'A4'],
      isNew: true,
      isOnSale: false,
      category: 'Stationery',
      material: 'Leather',
      description: `Premium leather journal with handmade paper. Perfect for writing, sketching, or planning. The leather develops a beautiful patina over time.`,
      features: ['Genuine leather cover', 'Handmade paper', '200 pages', 'Elastic closure']
    },
    {
      id: 'prod-4',
      name: 'Bamboo Cutting Board Set',
      price: 65,
      originalPrice: 80,
      rating: 4.7,
      reviewCount: 203,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'Natural', hex: '#D2B48C' }
      ],
      sizes: ['Small', 'Medium', 'Large', 'Set of 3'],
      isNew: false,
      isOnSale: true,
      category: 'Kitchen',
      material: 'Bamboo',
      description: `Sustainable bamboo cutting board set. Naturally antimicrobial and gentle on knife blades. Includes three different sizes for all your prep needs.`,
      features: ['Antimicrobial', 'Knife-friendly', 'Sustainable bamboo', 'Easy to clean']
    },
    {
      id: 'prod-5',
      name: 'Hand-Knitted Wool Sweater',
      price: 120,
      rating: 4.5,
      reviewCount: 67,
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'Cream', hex: '#FEFCFA' },
        { name: 'Gray', hex: '#6B7280' },
        { name: 'Navy', hex: '#1E3A8A' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      isNew: true,
      isOnSale: false,
      category: 'Fashion',
      material: 'Wool',
      description: `Cozy hand-knitted sweater made from premium wool. Each piece takes weeks to complete and features intricate cable patterns.`,
      features: ['Hand-knitted', 'Premium wool', 'Cable knit pattern', 'Machine washable']
    },
    {
      id: 'prod-6',
      name: 'Ceramic Dinner Plate Set',
      price: 95,
      originalPrice: 120,
      rating: 4.8,
      reviewCount: 145,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'
      ],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Blue', hex: '#2563EB' },
        { name: 'Green', hex: '#059669' }
      ],
      sizes: ['Set of 4', 'Set of 6', 'Set of 8'],
      isNew: false,
      isOnSale: true,
      category: 'Home & Living',
      material: 'Ceramic',
      description: `Elegant ceramic dinner plates with a modern minimalist design. Perfect for everyday dining or special occasions.`,
      features: ['Dishwasher safe', 'Chip resistant', 'Lead-free glaze', 'Stackable design']
    }
  ];

  // Filter options
  const filterOptions = {
    productType: [
      { value: 'home-living', label: 'Home & Living', count: 45 },
      { value: 'fashion', label: 'Fashion', count: 32 },
      { value: 'kitchen', label: 'Kitchen', count: 28 },
      { value: 'stationery', label: 'Stationery', count: 15 }
    ],
    material: [
      { value: 'ceramic', label: 'Ceramic', count: 23 },
      { value: 'wool', label: 'Wool', count: 18 },
      { value: 'leather', label: 'Leather', count: 12 },
      { value: 'bamboo', label: 'Bamboo', count: 8 }
    ],
    color: [
      { value: '#FFFFFF', label: 'White', count: 34 },
      { value: '#000000', label: 'Black', count: 28 },
      { value: '#6B7280', label: 'Gray', count: 22 },
      { value: '#92400E', label: 'Brown', count: 19 },
      { value: '#1E3A8A', label: 'Navy', count: 15 },
      { value: '#F5F5DC', label: 'Beige', count: 12 }
    ],
    size: [
      { value: 'small', label: 'Small', count: 45 },
      { value: 'medium', label: 'Medium', count: 38 },
      { value: 'large', label: 'Large', count: 32 },
      { value: 'one-size', label: 'One Size', count: 15 }
    ],
    price: [
      { value: '0-25', label: 'Under $25', count: 12 },
      { value: '25-50', label: '$25 - $50', count: 28 },
      { value: '50-100', label: '$50 - $100', count: 35 },
      { value: '100+', label: '$100+', count: 18 }
    ],
    availability: [
      { value: 'in-stock', label: 'In Stock', count: 89 },
      { value: 'low-stock', label: 'Low Stock', count: 8 },
      { value: 'pre-order', label: 'Pre-order', count: 3 }
    ]
  };

  // Search suggestions
  const searchSuggestions = [
    'ceramic mug',
    'wool scarf',
    'leather journal',
    'bamboo cutting board',
    'hand-knitted sweater',
    'dinner plates'
  ];

  // Initialize products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.material?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply active filters
    Object.entries(activeFilters)?.forEach(([category, values]) => {
      if (values && values?.length > 0) {
        filtered = filtered?.filter(product => {
          switch (category) {
            case 'productType':
              return values?.some(value => 
                product?.category?.toLowerCase()?.replace(' & ', '-')?.replace(' ', '-') === value
              );
            case 'material':
              return values?.some(value => 
                product?.material?.toLowerCase() === value
              );
            case 'color':
              return values?.some(value => 
                product?.colors?.some(color => color?.hex === value)
              );
            case 'price':
              return values?.some(value => {
                const price = product?.price;
                switch (value) {
                  case '0-25': return price < 25;
                  case '25-50': return price >= 25 && price < 50;
                  case '50-100': return price >= 50 && price < 100;
                  case '100+': return price >= 100;
                  default: return true;
                }
              });
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'best-selling':
          return b?.reviewCount - a?.reviewCount;
        case 'price-low-high':
          return a?.price - b?.price;
        case 'price-high-low':
          return b?.price - a?.price;
        case 'customer-rated':
          return b?.rating - a?.rating;
        case 'alphabetical':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, activeFilters, sortBy]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleVisualSearch = useCallback((file) => {
    // Mock visual search - in real app, this would upload to AI service
    console.log('Visual search with file:', file?.name);
    setSearchQuery('ceramic mug'); // Mock result
  }, []);

  const handleFilterChange = useCallback((category, value, checked) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters?.[category]) {
        newFilters[category] = [];
      }
      
      if (checked) {
        if (!newFilters?.[category]?.includes(value)) {
          newFilters[category] = [...newFilters?.[category], value];
        }
      } else {
        newFilters[category] = newFilters?.[category]?.filter(v => v !== value);
        if (newFilters?.[category]?.length === 0) {
          delete newFilters?.[category];
        }
      }
      
      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  const handleRemoveFilter = useCallback((category, value) => {
    handleFilterChange(category, value, false);
  }, [handleFilterChange]);

  const handleClearAllFilters = useCallback(() => {
    setActiveFilters({});
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const handleWishlistToggle = useCallback((productId, isWishlisted) => {
    // Mock wishlist functionality
    console.log(`Product ${productId} ${isWishlisted ? 'added to' : 'removed from'} wishlist`);
  }, []);

  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  // Infinite scroll simulation
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setLoading(true);
      setTimeout(() => {
        // In real app, load more products from API
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 1000);
    }
  }, [hasMore, loading]);

  // Scroll event for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement?.scrollTop !== document.documentElement?.offsetHeight) {
        return;
      }
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <>
      <Helmet>
        <title>Product Catalog - CommerceOne | Discover Artisan Crafted Products</title>
        <meta name="description" content="Explore our curated collection of handcrafted products. From artisan ceramics to handwoven textiles, discover unique items made with intention and care." />
        <meta name="keywords" content="artisan products, handcrafted items, ceramic mugs, wool scarves, leather journals, sustainable goods" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-brand-charcoal to-brand-sage text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-crimson font-semibold text-4xl md:text-5xl mb-4 breathing-text">
                  Discover Artisan Crafted Products
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Each piece in our collection tells a story of craftsmanship, intention, and timeless design
                </p>
                
                <SearchBar
                  onSearch={handleSearch}
                  onVisualSearch={handleVisualSearch}
                  searchQuery={searchQuery}
                  suggestions={searchSuggestions}
                />
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                fullWidth
              >
                Filters & Sort
              </Button>
            </div>

            {/* Active Filters */}
            <ActiveFilters
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block">
                <FilterSidebar
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearAllFilters}
                />
              </aside>

              {/* Mobile Filter Sidebar */}
              {showFilters && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                  <div className="absolute inset-y-0 left-0 w-80 bg-background overflow-y-auto">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h2 className="font-crimson font-semibold text-xl">Filters</h2>
                      <Button
                        onClick={() => setShowFilters(false)}
                        variant="ghost"
                        size="sm"
                        iconName="X"
                      />
                    </div>
                    <div className="p-4">
                      <FilterSidebar
                        filters={filterOptions}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearAllFilters}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-crimson font-semibold text-2xl text-foreground">
                      {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {filteredProducts?.length} {filteredProducts?.length === 1 ? 'product' : 'products'} found
                    </p>
                  </div>
                  
                  <SortDropdown
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                  />
                </div>

                {/* Product Grid */}
                <ProductGrid
                  products={filteredProducts}
                  onWishlistToggle={handleWishlistToggle}
                  onQuickView={handleQuickView}
                  loading={loading && filteredProducts?.length === 0}
                />

                {/* Load More */}
                {hasMore && filteredProducts?.length > 0 && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      size="lg"
                      loading={loading}
                      iconName="MoreHorizontal"
                      iconPosition="left"
                    >
                      {loading ? 'Loading...' : 'Load More Products'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={closeQuickView}
        />

        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* Back to Top */}
        <BackToTop />
      </div>
    </>
  );
};

export default ProductCatalog;