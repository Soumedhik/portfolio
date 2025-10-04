import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for responsive breakpoints and device detection
 * Returns current breakpoint and helper booleans
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });
  
  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setDimensions({ width, height });
    
    if (width < 480) setBreakpoint('xs');
    else if (width < 768) setBreakpoint('sm');
    else if (width < 1024) setBreakpoint('md');
    else if (width < 1280) setBreakpoint('lg');
    else setBreakpoint('xl');
  }, []);
  
  useEffect(() => {
    // Debounce resize handler for better performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 150);
    };
    
    updateBreakpoint();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBreakpoint]);
  
  return {
    breakpoint,
    dimensions,
    isMobile: ['xs', 'sm'].includes(breakpoint),
    isTablet: breakpoint === 'md',
    isDesktop: ['lg', 'xl'].includes(breakpoint),
    isSmallMobile: breakpoint === 'xs',
    isLargeMobile: breakpoint === 'sm',
    isSmallTablet: breakpoint === 'md',
    isSmallDesktop: breakpoint === 'lg',
    isLargeDesktop: breakpoint === 'xl',
    // Specific size checks
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    // Orientation
    isPortrait: dimensions.height > dimensions.width,
    isLandscape: dimensions.width > dimensions.height,
  };
};

/**
 * Hook for detecting user preferences
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersDarkMode: true,
    prefersContrast: false
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const contrast = window.matchMedia('(prefers-contrast: high)');

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: reducedMotion.matches,
        prefersDarkMode: darkMode.matches,
        prefersContrast: contrast.matches
      });
    };

    updatePreferences();

    reducedMotion.addEventListener('change', updatePreferences);
    darkMode.addEventListener('change', updatePreferences);
    contrast.addEventListener('change', updatePreferences);

    return () => {
      reducedMotion.removeEventListener('change', updatePreferences);
      darkMode.removeEventListener('change', updatePreferences);
      contrast.removeEventListener('change', updatePreferences);
    };
  }, []);

  return preferences;
};

/**
 * Hook for lazy loading images
 */
export const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return { imageSrc, imageLoaded };
};

/**
 * Hook for performance monitoring (dev only)
 */
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        if (renderTime > 16) { // Slower than 60fps
          console.warn(
            `⚠️ ${componentName} render took ${renderTime.toFixed(2)}ms (target: <16ms for 60fps)`
          );
        }
      };
    }
  });
};

const responsiveHooks = {
  useResponsive,
  useUserPreferences,
  useLazyImage,
  usePerformanceMonitor
};

export default responsiveHooks;
