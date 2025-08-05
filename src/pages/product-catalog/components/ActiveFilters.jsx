import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters)?.forEach(([category, values]) => {
      if (values && values?.length > 0) {
        values?.forEach(value => {
          chips?.push({
            category,
            value,
            label: `${category}: ${value}`,
            displayValue: value
          });
        });
      }
    });
    
    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center space-x-2">
        <Icon name="Filter" size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Active Filters:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterChips?.map((chip, index) => (
          <div
            key={`${chip?.category}-${chip?.value}-${index}`}
            className="flex items-center space-x-2 px-3 py-1.5 bg-background border border-border rounded-full text-sm"
          >
            <span className="text-foreground">{chip?.displayValue}</span>
            <button
              onClick={() => onRemoveFilter(chip?.category, chip?.value)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
      {filterChips?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          className="text-muted-foreground hover:text-destructive ml-auto"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;