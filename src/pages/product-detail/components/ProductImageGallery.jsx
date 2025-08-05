import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    product?.mainImage,
    ...product?.galleryImages
  ];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
        <Image
          src={images?.[selectedImageIndex]}
          alt={`${product?.name} - View ${selectedImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md w-10 h-10"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md w-10 h-10"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {selectedImageIndex + 1} / {images?.length}
        </div>

        {/* AR Try-On Badge */}
        {product?.hasArTryOn && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            <Icon name="Smartphone" size={16} className="inline mr-1" />
            AR Try-On
          </div>
        )}
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImageIndex === index
                ? 'border-accent shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${product?.name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {/* 360° View Button */}
      {product?.has360View && (
        <Button
          variant="outline"
          className="w-full"
          iconName="RotateCcw"
          iconPosition="left"
        >
          360° View
        </Button>
      )}
    </div>
  );
};

export default ProductImageGallery;