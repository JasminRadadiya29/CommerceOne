import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CreatorStory from './components/CreatorStory';
import RecommendedProducts from './components/RecommendedProducts';
import StickyProductSummary from './components/StickyProductSummary';
import Breadcrumb from './components/Breadcrumb';
import RecentlyViewed from './components/RecentlyViewed';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productId = searchParams?.get('id') || '1';

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Artisan Leather Messenger Bag",
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.8,
    reviewCount: 127,
    sku: "ALB-001-BRN",
    inStock: true,
    stockCount: 15,
    maxQuantity: 5,
    mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop"
    ],
    hasArTryOn: true,
    has360View: true,
    colors: [
      { name: "Rich Brown", hex: "#8B4513" },
      { name: "Classic Black", hex: "#000000" },
      { name: "Cognac", hex: "#A0522D" },
      { name: "Navy Blue", hex: "#000080" }
    ],
    sizes: [
      { name: "Small", measurements: "12\" x 9\" x 4\"" },
      { name: "Medium", measurements: "14\" x 10\" x 5\"" },
      { name: "Large", measurements: "16\" x 11\" x 6\"" }
    ],
    description: `Crafted from premium full-grain leather, this messenger bag combines timeless style with modern functionality. Each piece is hand-stitched by skilled artisans using traditional techniques passed down through generations.\n\nThe spacious main compartment features a padded laptop sleeve that fits devices up to 15 inches, while multiple interior pockets keep your essentials organized. The adjustable shoulder strap and reinforced handles provide comfortable carrying options for any journey.\n\nThis bag develops a beautiful patina over time, making each piece unique to its owner. Perfect for professionals, students, or anyone who appreciates quality craftsmanship and enduring style.`,
    materials: [
      "Premium full-grain Italian leather",
      "Solid brass hardware with antique finish",
      "Cotton canvas lining with water-resistant coating",
      "YKK zippers for durability",
      "Hand-stitched with waxed thread"
    ],
    careInstructions: [
      "Clean with leather conditioner every 3-6 months",
      "Avoid prolonged exposure to direct sunlight",
      "Store in dust bag when not in use",
      "Allow to air dry if wet - never use heat",
      "Professional cleaning recommended for deep stains"
    ],
    sizeChart: [
      { size: "Small", chest: "12", waist: "9", length: "4" },
      { size: "Medium", chest: "14", waist: "10", length: "5" },
      { size: "Large", chest: "16", waist: "11", length: "6" }
    ],
    ratingDistribution: {
      5: 65,
      4: 25,
      3: 8,
      2: 2,
      1: 0
    },
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
        date: "December 15, 2024",
        comment: `Absolutely love this bag! The leather quality is exceptional and it's even more beautiful in person. The craftsmanship is evident in every detail. I've been using it daily for 3 months and it's aging beautifully.`,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop"
        ]
      },
      {
        id: 2,
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5,
        date: "December 10, 2024",
        comment: `Perfect size for my laptop and daily essentials. The organization pockets are well thought out. Highly recommend for anyone looking for a quality leather bag that will last for years.`
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 4,
        date: "December 5, 2024",
        comment: `Beautiful bag with excellent craftsmanship. The only minor issue is that it's a bit heavier than expected, but the quality more than makes up for it. The leather smells amazing!`
      }
    ],
    creatorStory: `This messenger bag was born from my travels through Italy, where I spent months learning from master leather craftsmen in Florence. Each bag represents over 20 hours of meticulous handwork, from selecting the finest hides to the final hand-buffed finish.\n\nI wanted to create something that would age gracefully with its owner, developing character and stories along the way. The design balances classic proportions with modern functionality, ensuring it serves you well whether you're heading to a business meeting or exploring a new city.`,
    processSteps: [
      {
        title: "Leather Selection",
        description: "Hand-picked full-grain hides from Italian tanneries"
      },
      {
        title: "Pattern Cutting",
        description: "Precision cutting using traditional templates"
      },
      {
        title: "Hand Stitching",
        description: "Saddle-stitched seams for maximum durability"
      }
    ]
  };

  const mockCreator = {
    name: "Alessandro Rossi",
    title: "Master Leather Craftsman",
    location: "Florence, Italy",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    yearsExperience: 15,
    awards: 8,
    followers: "12.5K"
  };

  const mockRecommendedProducts = [
    {
      id: "2",
      name: "Vintage Leather Wallet",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.7,
      reviewCount: 89,
      isNew: false
    },
    {
      id: "3",
      name: "Handcrafted Leather Belt",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop",
      price: 79.99,
      rating: 4.9,
      reviewCount: 156,
      isNew: true
    },
    {
      id: "4",
      name: "Leather Document Holder",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      rating: 4.6,
      reviewCount: 73,
      isNew: false
    },
    {
      id: "5",
      name: "Travel Leather Organizer",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      price: 149.99,
      rating: 4.8,
      reviewCount: 92,
      isNew: true
    }
  ];

  const mockRecentlyViewed = [
    {
      id: "6",
      name: "Canvas Tote Bag",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop",
      price: 49.99
    },
    {
      id: "7",
      name: "Leather Keychain",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop",
      price: 24.99
    },
    {
      id: "8",
      name: "Wool Scarf",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&h=200&fit=crop",
      price: 69.99
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/homepage" },
    { label: "Shop", href: "/product-catalog" },
    { label: "Bags & Accessories", href: "/product-catalog?category=bags" },
    { label: mockProduct?.name }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowStickyBar(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (productData) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart?.findIndex(
      item => item?.id === productData?.id && 
               item?.selectedColor?.name === productData?.selectedColor?.name &&
               item?.selectedSize?.name === productData?.selectedSize?.name
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += productData?.quantity;
    } else {
      // Add new item to cart
      existingCart?.push({
        id: productData?.id,
        name: productData?.name,
        price: productData?.price,
        image: productData?.mainImage,
        selectedColor: productData?.selectedColor,
        selectedSize: productData?.selectedSize,
        quantity: productData?.quantity
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message (you could add a toast notification here)
    alert(`Added ${productData?.quantity} item(s) to cart!`);
    
    // Navigate to cart
    navigate('/shopping-cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={product} onAddToCart={handleAddToCart} />
            </div>
          </div>

          {/* Creator Story */}
          <div className="mb-12">
            <CreatorStory creator={mockCreator} product={product} />
          </div>

          {/* Product Details Tabs */}
          <div className="mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Recently Viewed */}
          <div className="mb-12">
            <RecentlyViewed products={mockRecentlyViewed} />
          </div>

          {/* Recommended Products */}
          <div className="mb-12">
            <RecommendedProducts products={mockRecommendedProducts} />
          </div>
        </div>
      </div>

      {/* Sticky Product Summary */}
      <StickyProductSummary
        product={product}
        isVisible={showStickyBar}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetail;