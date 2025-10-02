import React from 'react';
import { motion } from 'framer-motion';
import { win11Variants, win11Duration, win11Easing } from '../utils/win11Animations';

// Enhanced Windows 11 Motion Components

// Windows 11 Window Component with built-in animations
export const Win11Window = ({ 
  children, 
  isMaximized = false, 
  isMinimized = false,
  isVisible = true,
  className = "",
  ...props 
}) => {
  const getVariant = () => {
    if (!isVisible) return "exit";
    if (isMinimized) return "minimized";
    if (isMaximized) return "maximized";
    return "visible";
  };

  return (
    <motion.div
      initial="hidden"
      animate={getVariant()}
      exit="exit"
      variants={{
        ...win11Variants.windowEntry,
        ...win11Variants.windowMaximize,
        ...win11Variants.windowMinimize,
      }}
      className={`bg-win11-surface border border-win11-border backdrop-blur-xl shadow-2xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Taskbar Item with Windows 11 animations
export const Win11TaskbarItem = ({ 
  children, 
  isActive = false, 
  onClick,
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      whileTap="pressed"
      animate={isActive ? "active" : "idle"}
      variants={win11Variants.taskbarItem}
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-2 py-1 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Desktop Icon with Windows 11 animations
export const Win11DesktopIcon = ({ 
  children, 
  onClick,
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      whileTap="pressed"
      variants={win11Variants.desktopIcon}
      onClick={onClick}
      className={`cursor-pointer select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Fluent Design Button
export const Win11Button = ({ 
  children, 
  variant = "primary",
  onClick,
  className = "",
  ...props 
}) => {
  const getVariantStyles = () => {
    const baseStyles = "rounded-lg px-4 py-2 font-medium transition-all backdrop-blur-sm";
    
    switch (variant) {
      case "primary":
        return `${baseStyles} bg-win11-accent text-win11-accent-text hover:bg-win11-accent-hover`;
      case "secondary":
        return `${baseStyles} bg-win11-surface text-win11-text border border-win11-border`;
      case "ghost":
        return `${baseStyles} text-win11-text hover:bg-win11-surface-hover`;
      default:
        return baseStyles;
    }
  };

  return (
    <motion.button
      initial="idle"
      whileHover="hover"
      whileTap="pressed"
      variants={win11Variants.fluentButton}
      onClick={onClick}
      className={`${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Sliding Panel (for settings, notifications, etc.)
export const Win11Panel = ({ 
  children, 
  direction = "right",
  isVisible = false,
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      variants={win11Variants.panelSlide[direction]}
      className={`fixed bg-win11-surface border border-win11-border backdrop-blur-xl shadow-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Notification/Toast Component
export const Win11Notification = ({ 
  children, 
  isVisible = false,
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      variants={win11Variants.notification}
      className={`fixed top-4 right-4 bg-win11-surface border border-win11-border backdrop-blur-xl shadow-lg rounded-lg p-4 z-50 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Context Menu with Windows 11 animations
export const Win11ContextMenu = ({ 
  children, 
  isVisible = false,
  position = { x: 0, y: 0 },
  className = "",
  ...props 
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={win11Variants.contextMenu}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
      className={`bg-win11-surface border border-win11-border backdrop-blur-xl shadow-xl rounded-lg py-2 min-w-48 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered List Animation
export const Win11StaggeredList = ({ 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={win11Variants.staggerContainer}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={win11Variants.staggerChild}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Loading Shimmer Effect
export const Win11LoadingShimmer = ({ 
  className = "",
  ...props 
}) => {
  return (
    <div className={`relative overflow-hidden bg-win11-surface-hover rounded ${className}`} {...props}>
      <div className="absolute inset-0 -translate-x-full animate-win11-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

// Floating Action Elements
export const Win11FloatingElement = ({ 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        ease: win11Easing.standard,
        repeat: Infinity,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Hover Card
export const Win11HoverCard = ({ 
  children, 
  hoverContent,
  delay = 0.5,
  className = "",
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;
    if (isHovered) {
      timeoutId = setTimeout(() => {
        setIsHovered(true);
      }, delay * 1000);
    } else {
      setIsHovered(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isHovered, delay]);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
      {isHovered && hoverContent && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{
            duration: win11Duration.fast,
            ease: win11Easing.fluent,
          }}
          className="absolute z-50 bg-win11-surface border border-win11-border backdrop-blur-xl shadow-xl rounded-lg p-3 mt-2"
        >
          {hoverContent}
        </motion.div>
      )}
    </div>
  );
};

// Glass Morphism Container
export const Win11GlassContainer = ({ 
  children, 
  intensity = "medium",
  className = "",
  ...props 
}) => {
  const getIntensityClass = () => {
    switch (intensity) {
      case "light": return "backdrop-blur-win11-light bg-white/5";
      case "medium": return "backdrop-blur-win11-medium bg-white/10";
      case "heavy": return "backdrop-blur-win11-heavy bg-white/15";
      default: return "backdrop-blur-win11-medium bg-white/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: win11Duration.slow,
        ease: win11Easing.fluent,
      }}
      className={`${getIntensityClass()} border border-white/20 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default {
  Win11Window,
  Win11TaskbarItem,
  Win11DesktopIcon,
  Win11Button,
  Win11Panel,
  Win11Notification,
  Win11ContextMenu,
  Win11StaggeredList,
  Win11LoadingShimmer,
  Win11FloatingElement,
  Win11HoverCard,
  Win11GlassContainer,
};