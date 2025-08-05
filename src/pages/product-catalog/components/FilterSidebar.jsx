import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, activeFilters, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    productType: true,
    material: true,
    color: true,
    size: true,
    price: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    onFilterChange(category, value, checked);
  };

  const colorSwatches = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Navy': '#1E3A8A',
    'Gray': '#6B7280',
    'Brown': '#92400E',
    'Beige': '#F5F5DC',
    'Red': '#DC2626',
    'Blue': '#2563EB',
    'Green': '#059669',
    'Pink': '#EC4899'
  };

  const FilterSection = ({ title, items, category, type = 'checkbox' }) => {
    const sectionKey = category;
    const isExpanded = expandedSections?.[sectionKey];

    return (
      <div className="border-b border-border pb-6 mb-6">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left mb-4 group"
        >
          <h3 className="font-crimson font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground group-hover:text-accent transition-colors"
          />
        </button>
        {isExpanded && (
          <div className="space-y-3">
            {type === 'color' ? (
              <div className="grid grid-cols-5 gap-2">
                {items?.map((item) => (
                  <button
                    key={item?.value}
                    onClick={() => handleFilterChange(category, item?.value, !activeFilters?.[category]?.includes(item?.value))}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      activeFilters?.[category]?.includes(item?.value)
                        ? 'border-accent scale-110' :'border-border hover:border-accent/50'
                    }`}
                    style={{ backgroundColor: colorSwatches?.[item?.label] || item?.value }}
                    title={item?.label}
                  >
                    {activeFilters?.[category]?.includes(item?.value) && (
                      <Icon 
                        name="Check" 
                        size={14} 
                        className={`absolute inset-0 m-auto ${
                          item?.label === 'White' || item?.label === 'Beige' ? 'text-gray-800' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : type === 'price' ? (
              <div className="space-y-3">
                {items?.map((item) => (
                  <label key={item?.value} className="flex items-center space-x-3 cursor-pointer group">
                    <Checkbox
                      checked={activeFilters?.[category]?.includes(item?.value) || false}
                      onChange={(e) => handleFilterChange(category, item?.value, e?.target?.checked)}
                    />
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                      {item?.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({item?.count})
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {items?.map((item) => (
                  <label key={item?.value} className="flex items-center space-x-3 cursor-pointer group">
                    <Checkbox
                      checked={activeFilters?.[category]?.includes(item?.value) || false}
                      onChange={(e) => handleFilterChange(category, item?.value, e?.target?.checked)}
                    />
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                      {item?.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({item?.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-crimson font-semibold text-xl text-foreground">Filters</h2>
        {Object.keys(activeFilters)?.some(key => activeFilters?.[key]?.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-accent"
          >
            Clear All
          </Button>
        )}
      </div>
      <FilterSection
        title="Product Type"
        items={filters?.productType}
        category="productType"
      />
      <FilterSection
        title="Material"
        items={filters?.material}
        category="material"
      />
      <FilterSection
        title="Color"
        items={filters?.color}
        category="color"
        type="color"
      />
      <FilterSection
        title="Size"
        items={filters?.size}
        category="size"
      />
      <FilterSection
        title="Price Range"
        items={filters?.price}
        category="price"
        type="price"
      />
      <FilterSection
        title="Availability"
        items={filters?.availability}
        category="availability"
      />
    </div>
  );
};

export default FilterSidebar;