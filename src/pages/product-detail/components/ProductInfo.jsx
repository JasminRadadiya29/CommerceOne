import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
  };

  const colorOptions = product?.colors?.map(color => ({
    value: color?.name,
    label: color?.name
  }));

  const sizeOptions = product?.sizes?.map(size => ({
    value: size?.name,
    label: size?.name,
    description: size?.measurements
  }));

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <h1 className="text-3xl font-crimson font-semibold text-primary mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={`${
                  i < Math.floor(product?.rating)
                    ? 'text-yellow-400 fill-current' :'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {product?.rating} ({product?.reviewCount} reviews)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            SKU: {product?.sku}
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-semibold text-primary">
          ${product?.price}
        </span>
        {product?.originalPrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${product?.originalPrice}
          </span>
        )}
        {product?.discount && (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
            {product?.discount}% OFF
          </span>
        )}
      </div>
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon
          name={product?.inStock ? "CheckCircle" : "XCircle"}
          size={16}
          className={product?.inStock ? "text-green-600" : "text-red-600"}
        />
        <span className={`text-sm font-medium ${
          product?.inStock ? "text-green-600" : "text-red-600"
        }`}>
          {product?.inStock ? `In Stock (${product?.stockCount} available)` : "Out of Stock"}
        </span>
      </div>
      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Color: {selectedColor?.name}
        </label>
        <div className="flex space-x-2">
          {product?.colors?.map((color) => (
            <button
              key={color?.name}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColor?.name === color?.name
                  ? 'border-accent shadow-md scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color?.hex }}
              title={color?.name}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <Select
          label="Size"
          options={sizeOptions}
          value={selectedSize?.name}
          onChange={(value) => setSelectedSize(product?.sizes?.find(s => s?.name === value))}
          className="mb-2"
        />
        <Button variant="link" className="text-sm p-0 h-auto">
          <Icon name="Ruler" size={14} className="mr-1" />
          Size Guide
        </Button>
      </div>
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product?.maxQuantity}
            className="w-10 h-10"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>
      {/* Add to Cart & Actions */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={!product?.inStock}
          className="w-full"
          size="lg"
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart - ${(product?.price * quantity)?.toFixed(2)}
        </Button>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" iconName="Heart">
            Add to Wishlist
          </Button>
          <Button variant="outline" className="flex-1" iconName="Share2">
            Share
          </Button>
        </div>
      </div>
      {/* Quick Features */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-muted-foreground" />
            <span>Free shipping over $50</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
            <span>30-day returns</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span>2-year warranty</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-muted-foreground" />
            <span>Handcrafted quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;