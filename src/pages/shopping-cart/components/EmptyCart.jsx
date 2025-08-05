import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyCart = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Artisan Leather Journal",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Organic Cotton Tote Bag",
      price: 18.50,
      originalPrice: 22.00,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156
    }
  ];

  const creatorStory = {
    title: "Crafted with Intention",
    description: `Every piece in our collection tells a story of dedication, sustainability, and artisanal excellence. From the initial sketch to the final product, each item is thoughtfully created to bring beauty and functionality into your daily life.`,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Empty Cart Message */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-crimson font-semibold text-foreground mb-4">
          Your cart is empty
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Discover our carefully curated collection of handcrafted items and find something special for yourself or a loved one.
        </p>
        <Button
          variant="default"
          size="lg"
          iconName="ArrowRight"
          iconPosition="right"
          asChild
        >
          <Link to="/product-catalog">Start Shopping</Link>
        </Button>
      </div>
      {/* Creator Story Section */}
      <div className="bg-card border border-border rounded-lg p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-crimson font-semibold text-foreground mb-4">
              {creatorStory?.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {creatorStory?.description}
            </p>
            <Button
              variant="outline"
              iconName="Play"
              iconPosition="left"
              asChild
            >
              <Link to="/about">Watch Our Story</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={creatorStory?.image}
              alt="Artisan at work"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
      {/* Recommended Products */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-crimson font-semibold text-foreground mb-2">
            You might like these
          </h2>
          <p className="text-muted-foreground">
            Handpicked favorites from our collection
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-warm transition-all duration-300">
              <Link to={`/product-detail?id=${product?.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                    {product?.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.floor(product?.rating) ? "text-accent fill-current" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product?.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">
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
              
              <div className="p-4 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Newsletter Signup */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 mt-12 text-center">
        <Icon name="Mail" size={32} className="text-accent mx-auto mb-4" />
        <h3 className="text-xl font-crimson font-semibold text-foreground mb-2">
          Stay in the loop
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Be the first to know about new collections, exclusive offers, and behind-the-scenes stories.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <Button variant="default">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;