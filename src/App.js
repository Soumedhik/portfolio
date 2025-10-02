import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Lockscreen from "./Pages/lockscreen";
import Main from "./Pages/main";
import MobileDetection from "./components/utilities/MobileDetection";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // SEO and Performance optimizations
  useEffect(() => {
    // Preload critical resources
    const preloadImage = (src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };

    // Preload important images
    preloadImage('/profile.jpg');
    preloadImage('/images/apps/calculator.png');
    preloadImage('/images/apps/chrome.png');
    
    // Add structured data for better SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Soumedhik's Portfolio",
      "url": "https://soumedhiks-portfolio.vercel.app/",
      "description": "Interactive portfolio of Soumedhik Bharati - AI Engineer & Problem Solver",
      "author": {
        "@type": "Person",
        "name": "Soumedhik Bharati",
        "jobTitle": "AI Engineer & Problem Solver"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://soumedhiks-portfolio.vercel.app/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);

    // Service worker registration for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, but continue
      });
    }
  }, []);

  const handleMobileDetection = (mobile) => {
    setIsMobile(mobile);
    
    // Add mobile-specific optimizations
    if (mobile) {
      // Prevent pull-to-refresh on mobile
      document.body.style.overscrollBehavior = 'none';
      
      // Add mobile viewport classes
      document.documentElement.classList.add('mobile-optimized');
    }
  };

  // Animated Routes Component
  const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  scale: 1.1,
                  filter: "blur(10px)"
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1]
                }}
              >
                <Lockscreen isMobile={isMobile} />
              </motion.div>
            } 
          />
          <Route 
            path="/:name" 
            element={
              <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0.95,
                  y: 20
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.23, 1, 0.320, 1]
                }}
              >
                <Main isMobile={isMobile} />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    );
  };

  return (
    <Router>
      <MobileDetection onDetectMobile={handleMobileDetection} />
      <AnimatedRoutes />
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
