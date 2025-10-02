import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    // Monitor component render times
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 16) { // More than 16ms (60fps threshold)
          console.warn(`Slow render: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    // Monitor memory usage
    const checkMemory = () => {
      if (performance.memory) {
        const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
        const usagePercent = (usedJSHeapSize / totalJSHeapSize) * 100;
        
        if (usagePercent > 80) {
          console.warn(`High memory usage: ${usagePercent.toFixed(1)}%`);
        }
      }
    };
    
    // Check memory every 30 seconds
    const memoryInterval = setInterval(checkMemory, 30000);
    
    return () => {
      observer.disconnect();
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;