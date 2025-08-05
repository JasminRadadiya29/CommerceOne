import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedCollections = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const collections = [
    {
      id: 1,
      name: "Signature Jewelry",
      description: "Handcrafted pieces that tell your unique story",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
      itemCount: 24,
      priceRange: "$89 - $299",
      featured: true,
      quickAddItems: [
        { id: 101, name: "Silver Moon Ring", price: 129, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&h=150&fit=crop" },
        { id: 102, name: "Gold Leaf Necklace", price: 189, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop" }
      ]
    },
    {
      id: 2,
      name: "Artisan Ceramics",
      description: "Functional art for modern living spaces",
      image: "https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg?w=600&h=400&fit=crop",
      itemCount: 18,
      priceRange: "$45 - $180",
      featured: false,
      quickAddItems: [
        { id: 201, name: "Handthrown Mug Set", price: 68, image: "https://images.pexels.com/photos/4040727/pexels-photo-4040727.jpeg?w=150&h=150&fit=crop" },
        { id: 202, name: "Ceramic Planter", price: 95, image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?w=150&h=150&fit=crop" }
      ]
    },
    {
      id: 3,
      name: "Luxury Textiles",
      description: "Sustainable fabrics with timeless elegance",
      image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=600&h=400&fit=crop",
      itemCount: 32,
      priceRange: "$120 - $450",
      featured: true,
      quickAddItems: [
        { id: 301, name: "Organic Cotton Scarf", price: 145, image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=150&h=150&fit=crop" },
        { id: 302, name: "Linen Throw Blanket", price: 225, image: "https://images.pixabay.com/photo/2020/10/26/13/58/blanket-5686049_1280.jpg?w=150&h=150&fit=crop" }
      ]
    },
    {
      id: 4,
      name: "Home Essentials",
      description: "Curated pieces for mindful living",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      itemCount: 15,
      priceRange: "$35 - $220",
      featured: false,
      quickAddItems: [
        { id: 401, name: "Wooden Serving Board", price: 78, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop" },
        { id: 402, name: "Handwoven Basket", price: 125, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop" }
      ]
    }
  ];

  const handleQuickAdd = (item, collectionName) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart?.find(cartItem => cartItem?.id === item?.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart?.push({
        id: item?.id,
        name: item?.name,
        price: item?.price,
        image: item?.image,
        collection: collectionName,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections, each piece selected for its exceptional craftsmanship and timeless appeal.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections?.map((collection) => (
            <div
              key={collection?.id}
              className="group relative bg-card rounded-lg overflow-hidden gallery-shadow hover:warm-shadow transition-all duration-500"
              onMouseEnter={() => setHoveredItem(collection?.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Featured Badge */}
              {collection?.featured && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}

              {/* Collection Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={collection?.image}
                  alt={collection?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Quick Add Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 ${
                  hoveredItem === collection?.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="text-center space-y-4">
                    <p className="text-white font-medium mb-4">Quick Add</p>
                    <div className="flex space-x-2">
                      {collection?.quickAddItems?.map((item) => (
                        <div key={item?.id} className="text-center">
                          <div className="w-16 h-16 rounded-lg overflow-hidden mb-2">
                            <Image
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            size="xs"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-foreground text-xs px-2 py-1"
                            onClick={() => handleQuickAdd(item, collection?.name)}
                          >
                            ${item?.price}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Collection Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-crimson font-semibold text-foreground mb-2">
                    {collection?.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {collection?.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{collection?.itemCount} items</span>
                  <span className="font-medium">{collection?.priceRange}</span>
                </div>

                <Link to="/product-catalog" className="block">
                  <Button 
                    variant="outline" 
                    fullWidth
                    className="group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300"
                  >
                    Explore Collection
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collections CTA */}
        <div className="text-center mt-12">
          <Link to="/product-catalog">
            <Button variant="default" size="lg" className="px-8">
              View All Collections
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;