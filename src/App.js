import React, { useEffect, useState, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Lazy load components for better initial load performance
const Lockscreen = lazy(() => import("./Pages/lockscreen"));
const Main = lazy(() => import("./Pages/main"));
const MobileDetection = lazy(() => import("./components/utilities/MobileDetection"));

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const enableSpeedInsights = process.env.REACT_APP_ENABLE_SPEED_INSIGHTS === "true";
  const enableAnalytics = process.env.REACT_APP_ENABLE_VERCEL_ANALYTICS === "true";

  // SEO and Performance optimizations
  useEffect(() => {
    // Performance mark for measuring app initialization
    if (performance && performance.mark) {
      performance.mark('app-init-start');
    }
    
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
      }
    });
    document.head.appendChild(script);

    // Service worker registration for PWA (production only)
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, but continue
        });
      } else {
        // Ensure dev builds aren't served stale chunks from an old service worker
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        }).catch(() => {
          // Ignore cleanup errors in development
        });
      }
    }
    
    // Performance mark for measuring app initialization complete
    if (performance && performance.mark) {
      performance.mark('app-init-end');
      performance.measure('app-initialization', 'app-init-start', 'app-init-end');
    }
  }, []);

  const handleMobileDetection = (mobile) => {
    setIsMobile(mobile);
    
    // Add mobile-specific optimizations
    if (mobile) {
      document.body.style.overscrollBehavior = 'none';
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
          {/* Catch-all route for 404s - redirect to home */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </AnimatePresence>
    );
  };

  return (
    <Router>
      <MobileDetection onDetectMobile={handleMobileDetection} />
      <AnimatedRoutes />
      {enableSpeedInsights && <SpeedInsights />}
      {enableAnalytics && <Analytics />}
    </Router>
  );
}

export default App;
