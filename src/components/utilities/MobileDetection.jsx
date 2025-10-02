import { useEffect, useState } from "react";

const MobileDetection = ({ onDetectMobile }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Enhanced mobile detection
      const isMobileDevice = (
        /android/i.test(userAgent) ||
        /iPad|iPhone|iPod/.test(userAgent) ||
        /Windows Phone/i.test(userAgent) ||
        /BlackBerry/i.test(userAgent) ||
        /Opera Mini/i.test(userAgent) ||
        screenWidth <= 768 ||
        ('ontouchstart' in window && screenWidth <= 1024)
      );

      // Tablet detection
      const isTabletDevice = (
        /iPad/.test(userAgent) ||
        (/Android/i.test(userAgent) && !/Mobile/i.test(userAgent)) ||
        (screenWidth > 768 && screenWidth <= 1024 && 'ontouchstart' in window)
      );

      setIsMobile(isMobileDevice && !isTabletDevice);
      setIsTablet(isTabletDevice);
      
      if (onDetectMobile) {
        onDetectMobile(isMobileDevice || isTabletDevice);
      }

      // Add CSS classes for device-specific styling
      document.body.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
      
      if (isMobileDevice && !isTabletDevice) {
        document.body.classList.add('mobile-device');
      } else if (isTabletDevice) {
        document.body.classList.add('tablet-device');
      } else {
        document.body.classList.add('desktop-device');
      }
    };

    // Initial check
    checkDeviceType();

    // Listen for orientation changes and resize events
    const handleResize = () => {
      setTimeout(checkDeviceType, 100); // Small delay for orientation change
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [onDetectMobile]);

  // Add viewport meta tag optimization for mobile
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on double tap
      let lastTouchEnd = 0;
      const preventZoom = (e) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };
      
      document.addEventListener('touchend', preventZoom, { passive: false });
      
      return () => {
        document.removeEventListener('touchend', preventZoom);
      };
    }
  }, [isMobile]);

  return null;
};

export default MobileDetection;
