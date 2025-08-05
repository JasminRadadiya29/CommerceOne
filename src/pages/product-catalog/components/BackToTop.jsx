import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full shadow-warm bg-accent hover:bg-accent/90 text-accent-foreground"
        iconName="ArrowUp"
      />
    </div>
  );
};

export default BackToTop;