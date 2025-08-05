import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'sizeGuide', label: 'Size Guide', icon: 'Ruler' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare', count: product?.reviewCount },
    { id: 'shipping', label: 'Shipping & Returns', icon: 'Truck' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {product?.description}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Materials & Craftsmanship</h4>
              <ul className="space-y-1 text-muted-foreground">
                {product?.materials?.map((material, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-green-600" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Care Instructions</h4>
              <ul className="space-y-1 text-muted-foreground">
                {product?.careInstructions?.map((instruction, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Info" size={14} className="text-blue-600" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'sizeGuide':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Size Guide</h3>
              <p className="text-muted-foreground mb-4">
                Find your perfect fit with our comprehensive sizing guide.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Chest (in)</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Waist (in)</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.sizeChart?.map((size, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2 font-medium">{size?.size}</td>
                      <td className="border border-gray-200 px-4 py-2">{size?.chest}</td>
                      <td className="border border-gray-200 px-4 py-2">{size?.waist}</td>
                      <td className="border border-gray-200 px-4 py-2">{size?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Sizing Tip</h4>
                  <p className="text-blue-800 text-sm">
                    For the best fit, measure yourself and compare with our size chart. 
                    If you're between sizes, we recommend sizing up for comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <Button variant="outline" size="sm" iconName="Plus">
                Write Review
              </Button>
            </div>
            {/* Rating Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{product?.rating}</div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
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
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product?.reviewCount} reviews
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1]?.map((stars) => (
                    <div key={stars} className="flex items-center space-x-2 mb-1">
                      <span className="text-sm w-8">{stars}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(product?.ratingDistribution?.[stars] || 0)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {product?.ratingDistribution?.[stars] || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Individual Reviews */}
            <div className="space-y-4">
              {product?.reviews?.map((review) => (
                <div key={review?.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={review?.avatar}
                      alt={review?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review?.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={`${
                                i < review?.rating
                                  ? 'text-yellow-400 fill-current' :'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review?.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">{review?.comment}</p>
                      {review?.images && (
                        <div className="flex space-x-2">
                          {review?.images?.map((image, index) => (
                            <Image
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Truck" size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Free Standard Shipping</h4>
                    <p className="text-muted-foreground text-sm">
                      Free shipping on orders over $50. Delivery in 5-7 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Zap" size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Express Shipping</h4>
                    <p className="text-muted-foreground text-sm">
                      $15 for express delivery in 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Returns & Exchanges</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="RotateCcw" size={20} className="text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">30-Day Returns</h4>
                    <p className="text-muted-foreground text-sm">
                      Return items within 30 days for a full refund. Items must be in original condition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="RefreshCw" size={20} className="text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Easy Exchanges</h4>
                    <p className="text-muted-foreground text-sm">
                      Exchange for different size or color within 30 days. Free return shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Important Note</h4>
                  <p className="text-amber-800 text-sm">
                    Custom or personalized items cannot be returned unless defective. 
                    Please double-check your order before purchasing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count && (
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;