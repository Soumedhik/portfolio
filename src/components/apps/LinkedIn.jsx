import { useEffect, useRef } from "react";
import soundManager from '../../utils/soundManager';

const LinkedIn = ({ isAppOpen, toggleLinkedIn }) => {
  const linkedInURL = "https://www.linkedin.com/in/soumedhik-bharati-50b2bb203/";
  const hasOpenedRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isAppOpen && !hasOpenedRef.current) {
      // Mark as opened to prevent multiple executions
      hasOpenedRef.current = true;
      
      // Play sound effect for external link opening
      soundManager.play('windowOpen');
      
      // Open LinkedIn in new tab only
      const newWindow = window.open(linkedInURL, '_blank', 'noopener,noreferrer');
      
      // If popup was blocked, show a message instead of redirecting current tab
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Don't redirect current page, just show alert
        alert('Pop-up blocked! Please allow pop-ups or visit: ' + linkedInURL);
      }
      
      // Close the app after a short delay to ensure the popup opened
      timeoutRef.current = setTimeout(() => {
        soundManager.play('windowClose');
        toggleLinkedIn();
        // Reset the flag after closing
        hasOpenedRef.current = false;
      }, 800);
    }
    
    // If the app is closed externally, reset the flag
    if (!isAppOpen) {
      hasOpenedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isAppOpen, linkedInURL, toggleLinkedIn]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null; // This component doesn't render anything as it just redirects
};

export default LinkedIn;