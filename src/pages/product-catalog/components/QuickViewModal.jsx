import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart?.find(item => 
      item?.id === product?.id && 
      item?.color === selectedColor?.name && 
      item?.size === selectedSize
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart?.push({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.images?.[0],
        quantity: quantity,
        color: selectedColor?.name || 'Default',
        size: selectedSize || 'One Size'
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    onClose();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : index < rating ? "StarHalf" : "Star"}
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-crimson font-semibold text-xl text-foreground">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={product?.images?.[selectedImage]}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImage ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-crimson font-semibold text-2xl text-foreground mb-2">
                {product?.name}
              </h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product?.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <span className="font-semibold text-2xl text-foreground">
                  ${product?.price}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Color Selection */}
            {product?.colors && product?.colors?.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Color</h3>
                <div className="flex space-x-2">
                  {product?.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor?.name === color?.name
                          ? 'border-accent scale-110' :'border-border hover:border-accent/50'
                      }`}
                      style={{ backgroundColor: color?.hex }}
                      title={color?.name}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedColor?.name}
                  </p>
                )}
              </div>
            )}

            {/* Size Selection */}
            {product?.sizes && product?.sizes?.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product?.sizes?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <span className="font-medium text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                onClick={addToCart}
                size="lg"
                fullWidth
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add to Cart - ${(product?.price * quantity)?.toFixed(2)}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                fullWidth
                iconName="Heart"
                iconPosition="left"
              >
                Add to Wishlist
              </Button>
            </div>

            {/* Product Features */}
            {product?.features && product?.features?.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Features</h3>
                <ul className="space-y-2">
                  {product?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;