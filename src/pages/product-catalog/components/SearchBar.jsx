import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onVisualSearch, searchQuery, suggestions = [] }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const searchInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSearch = (query) => {
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    setShowSuggestions(value?.length > 0 && suggestions?.length > 0);
    
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
    searchInputRef?.current?.blur();
  };

  const handleVisualSearchClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      onVisualSearch(file);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    handleSearch('');
    searchInputRef?.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center bg-background border rounded-lg transition-all duration-200 ${
        isSearchFocused ? 'border-accent shadow-warm' : 'border-border'
      }`}>
        <div className="flex items-center pl-4">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onFocus={() => {
            setIsSearchFocused(true);
            setShowSuggestions(localQuery?.length > 0 && suggestions?.length > 0);
          }}
          onBlur={() => {
            setIsSearchFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Search products, materials, colors..."
          className="flex-1 px-4 py-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
        />

        <div className="flex items-center space-x-2 pr-2">
          {localQuery && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          )}
          
          <div className="w-px h-6 bg-border"></div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVisualSearchClick}
            iconName="Camera"
            className="text-muted-foreground hover:text-accent"
            title="Visual Search"
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-warm z-50 max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              Suggestions
            </div>
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-accent/10 hover:text-accent rounded transition-colors flex items-center space-x-2"
              >
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;