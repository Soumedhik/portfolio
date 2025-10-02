// Windows 11 Fluent Design Animation System
// Based on Microsoft's official animation guidelines

export const win11Easing = {
  // Windows 11 Standard Easing Curves
  standard: [0.25, 0.46, 0.45, 0.94],
  decelerate: [0.1, 0.9, 0.2, 1], // Slow exit (most common)
  accelerate: [0.7, 0, 1, 0.5],   // Fast exit  
  fluent: [0.76, 0, 0.24, 1],     // Signature Windows 11 curve
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.25, 0.46, 0.45, 0.94],
};

export const win11Duration = {
  // Microsoft's recommended durations
  fastest: 0.1,   // 100ms - Micro interactions
  faster: 0.15,   // 150ms - Small UI feedback  
  fast: 0.2,      // 200ms - Button presses, hovers
  normal: 0.3,    // 300ms - Standard transitions
  slow: 0.5,      // 500ms - Panel slides, large movements
  slower: 0.7,    // 700ms - Page transitions
  slowest: 1.0,   // 1000ms - Major state changes
};

// Pre-built Windows 11 Animation Variants
export const win11Variants = {
  // Window Animations
  windowEntry: {
    hidden: { 
      scale: 0.9, 
      opacity: 0, 
      y: 20,
      filter: "blur(8px)"
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: win11Duration.slow,
        ease: win11Easing.fluent,
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Maximize Animation (signature Windows 11 effect)
  windowMaximize: {
    windowed: {
      scale: 1,
      borderRadius: "12px",
      transition: {
        duration: win11Duration.normal,
        ease: win11Easing.fluent,
      }
    },
    maximized: {
      scale: 1.02,
      borderRadius: "0px", 
      transition: {
        duration: win11Duration.normal,
        ease: win11Easing.fluent,
      }
    }
  },

  // Minimize Animation (smooth scale down)
  windowMinimize: {
    normal: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.fluent,
      }
    },
    minimized: {
      scale: 0.1,
      opacity: 0,
      y: 200,
      transition: {
        duration: win11Duration.normal,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Taskbar Item Animations
  taskbarItem: {
    idle: { 
      scale: 1,
      y: 0,
      backgroundColor: "rgba(255, 255, 255, 0)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.decelerate,
      }
    },
    hover: { 
      scale: 1.1,
      y: -2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: {
        duration: win11Duration.faster,
        ease: win11Easing.fluent,
      }
    },
    active: {
      scale: 1.05,
      y: 0,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.fluent,
      }
    },
    pressed: {
      scale: 0.95,
      y: 1,
      transition: {
        duration: win11Duration.fastest,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Desktop Icon Animations
  desktopIcon: {
    idle: { 
      scale: 1,
      rotateY: 0,
      filter: "brightness(1)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.decelerate,
      }
    },
    hover: { 
      scale: 1.05,
      rotateY: 5,
      filter: "brightness(1.1)",
      transition: {
        duration: win11Duration.faster,
        ease: win11Easing.fluent,
      }
    },
    pressed: {
      scale: 0.98,
      rotateY: 0,
      filter: "brightness(0.9)",
      transition: {
        duration: win11Duration.fastest,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Button Animations (Fluent Design)
  fluentButton: {
    idle: {
      scale: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.decelerate,
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: {
        duration: win11Duration.faster,
        ease: win11Easing.fluent,
      }
    },
    pressed: {
      scale: 0.98,
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: {
        duration: win11Duration.fastest,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Panel Slide Animations
  panelSlide: {
    left: {
      hidden: { x: "-100%", opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: {
          duration: win11Duration.slow,
          ease: win11Easing.fluent,
        }
      },
      exit: { 
        x: "-100%", 
        opacity: 0,
        transition: {
          duration: win11Duration.normal,
          ease: win11Easing.accelerate,
        }
      }
    },
    right: {
      hidden: { x: "100%", opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: {
          duration: win11Duration.slow,
          ease: win11Easing.fluent,
        }
      },
      exit: { 
        x: "100%", 
        opacity: 0,
        transition: {
          duration: win11Duration.normal,
          ease: win11Easing.accelerate,
        }
      }
    },
    up: {
      hidden: { y: "-100%", opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: {
          duration: win11Duration.slow,
          ease: win11Easing.fluent,
        }
      },
      exit: { 
        y: "-100%", 
        opacity: 0,
        transition: {
          duration: win11Duration.normal,
          ease: win11Easing.accelerate,
        }
      }
    },
    down: {
      hidden: { y: "100%", opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: {
          duration: win11Duration.slow,
          ease: win11Easing.fluent,
        }
      },
      exit: { 
        y: "100%", 
        opacity: 0,
        transition: {
          duration: win11Duration.normal,
          ease: win11Easing.accelerate,
        }
      }
    }
  },

  // Notification/Toast Animations
  notification: {
    hidden: {
      x: 400,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: win11Duration.slow,
        ease: win11Easing.fluent,
      }
    },
    exit: {
      x: 400,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: win11Duration.normal,
        ease: win11Easing.accelerate,
      }
    }
  },

  // Loading/Skeleton Animations
  loadingPulse: {
    pulse: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: win11Easing.standard,
      }
    }
  },

  // Stagger Animations (for lists)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: win11Duration.normal,
      }
    }
  },

  staggerChild: {
    hidden: { 
      y: 20, 
      opacity: 0,
      filter: "blur(4px)"
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: win11Duration.normal,
        ease: win11Easing.fluent,
      }
    }
  },

  // Contextual Menu Animation
  contextMenu: {
    hidden: {
      scale: 0.95,
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: win11Duration.fast,
        ease: win11Easing.fluent,
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: -5,
      filter: "blur(2px)",
      transition: {
        duration: win11Duration.faster,
        ease: win11Easing.accelerate,
      }
    }
  }
};

// Gesture Animations (for mobile/touch)
export const win11Gestures = {
  drag: {
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: 0.1,
    dragTransition: { 
      bounceStiffness: 600, 
      bounceDamping: 20,
      power: 0.3,
      timeConstant: 200
    },
  },
  
  swipe: {
    threshold: 50,
    restSpeed: 0.1,
  }
};

// Advanced Animation Helpers
export const createCustomVariant = (config) => {
  return {
    hidden: {
      ...config.from,
      transition: {
        duration: config.duration || win11Duration.normal,
        ease: config.easing || win11Easing.fluent,
      }
    },
    visible: {
      ...config.to,
      transition: {
        duration: config.duration || win11Duration.normal,
        ease: config.easing || win11Easing.fluent,
      }
    }
  };
};

// Sequential Animation Chain
export const createAnimationChain = (animations) => {
  return animations.reduce((chain, animation, index) => {
    chain[`step${index}`] = {
      ...animation,
      transition: {
        ...animation.transition,
        delay: index * 0.1,
      }
    };
    return chain;
  }, {});
};

// Responsive Animation (adjusts based on screen size)
export const createResponsiveAnimation = (baseAnimation, mobileOverrides = {}) => {
  const isMobile = window.innerWidth < 768;
  
  return {
    ...baseAnimation,
    ...(isMobile ? mobileOverrides : {}),
    transition: {
      ...baseAnimation.transition,
      duration: isMobile ? 
        (baseAnimation.transition.duration * 0.7) : 
        baseAnimation.transition.duration,
    }
  };
};

export default {
  win11Variants,
  win11Easing,
  win11Duration,
  win11Gestures,
  createCustomVariant,
  createAnimationChain,
  createResponsiveAnimation,
};