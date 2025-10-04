import React from 'react';
import { motion } from 'framer-motion';
import soundManager from '../../utils/soundManager';

/**
 * Reusable Windows 11 Window Title Bar Component
 * Standardizes the title bar across all window components
 */
export const WindowTitleBar = ({ 
  title, 
  onMinimize, 
  onMaximize, 
  onClose,
  isFullscreen = false,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  children,
  className = ''
}) => {
  return (
    <div className={`title-bar glass-titlebar select-none ${className}`}>
      <div className="flex items-center justify-between h-9">
        <div className="px-3 text-sm font-medium truncate flex-1 titlebar-section">
          {title}
        </div>
        <div className="flex items-center titlebar-section">
          {showMinimize && onMinimize && (
            <button
              onClick={() => {
                soundManager.play('minimize');
                onMinimize();
              }}
              className="titlebar-button"
              title="Minimize"
              aria-label="Minimize window"
            >
              <span className="material-symbols-outlined">minimize</span>
            </button>
          )}
          {showMaximize && onMaximize && (
            <button
              onClick={() => {
                soundManager.play('maximize');
                onMaximize();
              }}
              className="titlebar-button"
              title={isFullscreen ? "Restore" : "Maximize"}
              aria-label={isFullscreen ? "Restore window" : "Maximize window"}
            >
              <span className="material-symbols-outlined">
                {isFullscreen ? "fullscreen_exit" : "crop_square"}
              </span>
            </button>
          )}
          {showClose && onClose && (
            <button
              onClick={() => {
                soundManager.play('windowClose');
                onClose();
              }}
              className="titlebar-button titlebar-button--close"
              title="Close"
              aria-label="Close window"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

/**
 * Reusable Icon Container Component
 * Standardizes desktop/taskbar icon appearance
 */
export const IconContainer = ({ 
  icon, 
  label, 
  onClick, 
  size = 'md',
  showLabel = true,
  className = '',
  iconClassName = ''
}) => {
  const sizes = {
    xs: 'w-10 h-10',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    xs: 'w-6 h-6 text-base',
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
    xl: 'w-14 h-14 text-3xl'
  };

  const labelSizes = {
    xs: 'text-[0.625rem]',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${sizes[size]} flex flex-col items-center justify-center
        rounded-md hover:bg-white hover:bg-opacity-20
        transition-all duration-200 touch-action-manipulation
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`${iconSizes[size]} flex items-center justify-center
        bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg ${iconClassName}`}>
        {typeof icon === 'string' ? (
          <span className="material-symbols-outlined text-white">
            {icon}
          </span>
        ) : (
          icon
        )}
      </div>
      {showLabel && label && (
        <div className={`${labelSizes[size]} text-center text-white mt-1 truncate w-full leading-tight`}>
          {label}
        </div>
      )}
    </motion.button>
  );
};

/**
 * Reusable Glassmorphism Card Component
 */
export const GlassCard = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Reusable Button with Windows 11 Styling
 */
export const Win11Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-win11-accent hover:bg-win11-accent-hover active:bg-win11-accent-pressed text-win11-accent-text',
    secondary: 'bg-win11-surface hover:bg-win11-surface-hover active:bg-win11-surface-pressed text-win11-text border border-win11-border',
    danger: 'bg-win11-error hover:bg-red-700 active:bg-red-800 text-white',
    success: 'bg-win11-success hover:bg-green-700 active:bg-green-800 text-white',
    ghost: 'bg-transparent hover:bg-win11-glass-hover active:bg-win11-glass text-win11-text'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        rounded-md font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-win11-accent focus:ring-offset-2 focus:ring-offset-win11-bg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Reusable Loading Spinner
 */
export const LoadingSpinner = ({ 
  size = 'md',
  message = 'Loading...',
  showMessage = true 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${sizes[size]} border-4 border-win11-accent border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {showMessage && (
        <p className="text-win11-text-secondary text-sm">{message}</p>
      )}
    </div>
  );
};

export default {
  WindowTitleBar,
  IconContainer,
  GlassCard,
  Win11Button,
  LoadingSpinner
};
