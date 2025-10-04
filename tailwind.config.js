/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Segoe UI Variable"', '"Segoe UI"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.625rem',    // 10px (was 12px)
        'sm': '0.75rem',     // 12px (was 14px)
        'base': '0.8125rem', // 13px (was 16px)
        'lg': '0.9375rem',   // 15px (was 18px)
        'xl': '1.0625rem',   // 17px (was 20px)
        '2xl': '1.3125rem',  // 21px (was 24px)
        '3xl': '1.625rem',   // 26px (was 30px)
        '4xl': '1.9375rem',  // 31px (was 36px)
        '5xl': '2.5rem',     // 40px (was 48px)
        '6xl': '3.125rem',   // 50px (was 60px)
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      width: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      height: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      colors: {
        // Windows 11 Color System
        'win11-bg': 'var(--win11-bg)',
        'win11-surface': 'var(--win11-surface)',
        'win11-surface-hover': 'var(--win11-surface-hover)',
        'win11-surface-pressed': 'var(--win11-surface-pressed)',
        'win11-border': 'var(--win11-border)',
        'win11-border-subtle': 'var(--win11-border-subtle)',
        'win11-text': 'var(--win11-text)',
        'win11-text-secondary': 'var(--win11-text-secondary)',
        'win11-text-disabled': 'var(--win11-text-disabled)',
        'win11-accent': 'var(--win11-accent)',
        'win11-accent-hover': 'var(--win11-accent-hover)',
        'win11-accent-pressed': 'var(--win11-accent-pressed)',
        'win11-accent-text': 'var(--win11-accent-text)',
        'win11-success': 'var(--win11-success)',
        'win11-warning': 'var(--win11-warning)',
        'win11-error': 'var(--win11-error)',
        'win11-info': 'var(--win11-info)',
        'win11-taskbar': 'var(--win11-taskbar)',
        'win11-glass': 'var(--win11-glass)',
        'win11-glass-hover': 'var(--win11-glass-hover)',
        'win11-shadow': 'var(--win11-shadow)',
        'win11-shadow-light': 'var(--win11-shadow-light)',
      },
      // Windows 11 Animation Extensions
      animation: {
        'win11-fade-in': 'win11FadeIn 0.3s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'win11-slide-up': 'win11SlideUp 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'win11-slide-down': 'win11SlideDown 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'win11-slide-left': 'win11SlideLeft 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'win11-slide-right': 'win11SlideRight 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'win11-scale-in': 'win11ScaleIn 0.3s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
      keyframes: {
        win11FadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        win11SlideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        win11SlideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        win11SlideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        win11SlideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        win11ScaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0', filter: 'blur(4px)' },
          '100%': { transform: 'scale(1)', opacity: '1', filter: 'blur(0px)' },
        },
        win11Bounce: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -15px, 0)' },
          '70%': { transform: 'translate3d(0, -7px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
        win11Glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 120, 215, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 120, 215, 0.6), 0 0 30px rgba(0, 120, 215, 0.4)' },
        },
        win11Shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        win11Float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        win11PulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },

        win11CardHover: {
          '0%': { 
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          },
          '100%': { 
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 12px 40px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)',
          },
        },
        win11OrbFloat: {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': { 
            transform: 'translate(100px, -50px) scale(1.1)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': { 
            transform: 'translate(-50px, -100px) scale(0.9)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': { 
            transform: 'translate(-100px, 50px) scale(1.05)',
            filter: 'hue-rotate(270deg)',
          },
        },
        win11Constellation: {
          '0%, 100%': { 
            opacity: '0.3',
            filter: 'brightness(1)',
          },
          '50%': { 
            opacity: '0.8',
            filter: 'brightness(1.5)',
          },
        },
        win11GridPulse: {
          '0%, 100%': { 
            opacity: '0.1',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '0.3',
            transform: 'scale(1.02)',
          },
        },
        win11LightSweep: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '50%': { 
            opacity: '1',
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      // Enhanced transitions with Windows 11 easing
      transitionTimingFunction: {
        'win11-standard': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'win11-decelerate': 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        'win11-accelerate': 'cubic-bezier(0.7, 0, 1, 0.5)',
        'win11-fluent': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'win11-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // Windows 11 specific backdrop filters
      backdropBlur: {
        'win11-light': '20px',
        'win11-medium': '40px',
        'win11-heavy': '60px',
      },
    },
  },
  plugins: [require("daisyui")],
}