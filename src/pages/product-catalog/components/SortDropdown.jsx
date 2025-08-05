import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'newest', label: 'Newest', icon: 'Clock' },
    { value: 'best-selling', label: 'Best Selling', icon: 'TrendingUp' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'customer-rated', label: 'Customer Rated', icon: 'Star' },
    { value: 'alphabetical', label: 'A-Z', icon: 'AlphabeticalSort' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-accent transition-colors text-sm font-medium text-foreground"
      >
        <Icon name={currentSort?.icon} size={16} className="text-muted-foreground" />
        <span>Sort by: {currentSort?.label}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm z-50 py-2">
          {sortOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleSortSelect(option?.value)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                option?.value === sortBy
                  ? 'text-accent bg-accent/10' :'text-popover-foreground hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
              {option?.value === sortBy && (
                <Icon name="Check" size={14} className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;