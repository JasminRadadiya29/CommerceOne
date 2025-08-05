import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreatorStory = ({ creator, product }) => {
  return (
    <div className="bg-gradient-to-r from-stone-50 to-amber-50 rounded-lg p-6 border border-stone-200">
      <div className="flex items-start space-x-4">
        <Image
          src={creator?.avatar}
          alt={creator?.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-crimson font-semibold text-primary">
              {creator?.name}
            </h3>
            <Icon name="BadgeCheck" size={16} className="text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {creator?.title} • {creator?.location}
          </p>
          
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2">
              The Story Behind "{product?.name}"
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product?.creatorStory}
            </p>
          </div>

          <div className="flex items-center space-x-6 mb-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {creator?.yearsExperience} years experience
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {creator?.awards} awards
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {creator?.followers} followers
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" iconName="User">
              View Profile
            </Button>
            <Button variant="ghost" size="sm" iconName="MessageCircle">
              Message Creator
            </Button>
          </div>
        </div>
      </div>
      {/* Process Highlights */}
      <div className="mt-6 pt-6 border-t border-stone-200">
        <h4 className="font-medium text-foreground mb-3">Craftsmanship Process</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product?.processSteps?.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div>
                <h5 className="font-medium text-sm text-foreground mb-1">
                  {step?.title}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorStory;