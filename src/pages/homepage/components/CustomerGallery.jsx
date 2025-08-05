import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomerGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const customerPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      customer: "Sarah M.",
      location: "New York",
      product: "Silver Moon Ring",
      caption: "Absolutely in love with this piece! The craftsmanship is incredible and it goes with everything. #CommerceOneCrafted",
      likes: 127,
      verified: true,
      instagram: "@sarah_styles_nyc"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg?w=400&h=400&fit=crop",
      customer: "Michael R.",
      location: "California",
      product: "Handthrown Mug Set",
      caption: "Perfect for my morning coffee ritual. These mugs have transformed my daily routine into something special. #CommerceOneCrafted",
      likes: 89,
      verified: true,
      instagram: "@mike_coffee_co"
    },
    {
      id: 3,
      image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=400&h=400&fit=crop",
      customer: "Emma L.",
      location: "London",
      product: "Organic Cotton Scarf",
      caption: "The quality is outstanding and I love knowing it\'s sustainably made. A true investment piece! #CommerceOneCrafted",
      likes: 156,
      verified: true,
      instagram: "@emma_sustainable"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      customer: "David K.",
      location: "Toronto",
      product: "Wooden Serving Board",
      caption: "This serving board is the centerpiece of every dinner party. Guests always ask where I got it! #CommerceOneCrafted",
      likes: 203,
      verified: true,
      instagram: "@david_entertains"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      customer: "Lisa T.",
      location: "Sydney",
      product: "Gold Leaf Necklace",
      caption: "Wearing this makes me feel so elegant. The attention to detail is remarkable. Thank you Elena! #CommerceOneCrafted",
      likes: 178,
      verified: true,
      instagram: "@lisa_jewelry_love"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/4040727/pexels-photo-4040727.jpeg?w=400&h=400&fit=crop",
      customer: "James W.",
      location: "Chicago",
      product: "Ceramic Planter Set",
      caption: "These planters have brought so much life to my apartment. The craftsmanship is evident in every detail. #CommerceOneCrafted",
      likes: 134,
      verified: true,
      instagram: "@james_plant_dad"
    }
  ];

  const openModal = (post) => {
    setSelectedImage(post);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-accent mb-4">
            <Icon name="Camera" size={20} />
            <span className="text-sm font-medium uppercase tracking-wide">Customer Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-crimson font-semibold text-foreground mb-4">
            See How Our Customers Style Their Pieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real customers, real stories. Join our community and share your CommerceOne moments with #CommerceOneCrafted
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {customerPosts?.map((post) => (
            <div
              key={post?.id}
              className="group relative aspect-square bg-card rounded-lg overflow-hidden gallery-shadow hover:warm-shadow transition-all duration-300 cursor-pointer"
              onClick={() => openModal(post)}
            >
              <Image
                src={post?.image}
                alt={`${post?.customer}'s ${post?.product}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <Icon name="Heart" size={20} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{post?.likes} likes</p>
                </div>
              </div>

              {/* Verified Badge */}
              {post?.verified && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <div className="bg-background rounded-2xl p-8 gallery-shadow max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Instagram" size={24} className="text-accent" />
              <span className="text-xl font-crimson font-semibold text-foreground">
                Share Your Story
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Tag us @commerceone and use #CommerceOneCrafted to be featured in our customer gallery
            </p>
            <Button variant="default" size="lg" className="px-8">
              Follow @commerceone
              <Icon name="ExternalLink" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square">
                <Image
                  src={selectedImage?.image}
                  alt={`${selectedImage?.customer}'s ${selectedImage?.product}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{selectedImage?.customer}</span>
                      {selectedImage?.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-accent" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedImage?.location}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-foreground">Product: {selectedImage?.product}</p>
                  <p className="text-muted-foreground leading-relaxed">{selectedImage?.caption}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Heart" size={18} className="text-accent" />
                      <span className="text-sm text-muted-foreground">{selectedImage?.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Instagram" size={18} className="text-accent" />
                      <span className="text-sm text-muted-foreground">{selectedImage?.instagram}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerGallery;