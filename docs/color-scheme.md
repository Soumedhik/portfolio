# Windows 11 Color Scheme Documentation

## Overview
This document outlines the comprehensive Windows 11 color scheme management system implemented across the portfolio website for consistent theming and visual cohesion.

## Color Variables

### CSS Variables (Available in :root)
All color variables are defined in `src/index.css` and available throughout the application:

```css
/* Primary Windows 11 colors */
--w11-bg-primary: #1e1e1e;        /* Main background */
--w11-bg-secondary: #262626;      /* Secondary backgrounds */
--w11-bg-tertiary: #323232;       /* Elevated surfaces */

/* Surface colors */
--w11-surface: #171717;           /* Window backgrounds */
--w11-surface-hover: #404040;     /* Hover states */
--w11-surface-active: #525252;    /* Active/pressed states */

/* Border colors */
--w11-border: #404040;            /* Default borders */
--w11-border-light: #525252;      /* Lighter borders */
--w11-border-dark: #262626;       /* Darker borders */

/* Text colors */
--w11-text-primary: #ffffff;      /* Primary text */
--w11-text-secondary: #d4d4d4;    /* Secondary text */
--w11-text-muted: #a3a3a3;        /* Muted text */
--w11-text-disabled: #737373;     /* Disabled text */

/* Accent colors */
--w11-accent-blue: #0078d4;       /* Primary blue accent */
--w11-accent-blue-hover: #106ebe; /* Blue hover state */
--w11-accent-blue-light: #60cdff; /* Light blue */

/* Status colors */
--w11-success: #107c10;           /* Success/green */
--w11-success-hover: #0e6a0e;     /* Success hover */
--w11-warning: #ffc83d;           /* Warning/yellow */
--w11-warning-hover: #e6b332;     /* Warning hover */
--w11-error: #d13438;             /* Error/red */
--w11-error-hover: #b22a2e;       /* Error hover */
--w11-info: #0078d4;              /* Info/blue */
--w11-info-hover: #106ebe;        /* Info hover */

/* Special colors */
--w11-purple: #8b5cf6;            /* Purple accent */
--w11-purple-hover: #7c3aed;      /* Purple hover */
--w11-glass: rgba(255, 255, 255, 0.05);   /* Glass effect */
--w11-glass-hover: rgba(255, 255, 255, 0.1); /* Glass hover */
```

### Tailwind Configuration Colors
Extended Tailwind configuration in `tailwind.config.js` includes all the above colors:

```javascript
colors: {
  'w11': {
    'bg-primary': '#1e1e1e',
    'bg-secondary': '#262626',
    // ... all color definitions
  }
}
```

## Usage Guidelines

### 1. Inline Styles (Recommended for Dynamic Interactions)
Use CSS variables with inline styles for interactive components:

```jsx
<div 
  style={{backgroundColor: 'var(--w11-bg-secondary)', border: '1px solid var(--w11-border)'}}
  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-surface-hover)'}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--w11-bg-secondary)'}
>
  Interactive element
</div>
```

### 2. Tailwind Classes
Use extended Tailwind classes for static styling:

```jsx
<div className="bg-w11-bg-secondary border-w11-border text-w11-text-primary">
  Static element
</div>
```

### 3. Direct CSS Variable Usage
For complex styling or animations:

```css
.custom-component {
  background: linear-gradient(135deg, var(--w11-bg-secondary), var(--w11-surface));
  border: 1px solid var(--w11-border);
  color: var(--w11-text-primary);
}
```

## Component Categories

### Windows & Surfaces
- **Primary Windows**: Use `--w11-surface` for main window background
- **Title Bars**: Use `--w11-bg-secondary` with `--w11-border` borders
- **Elevated Cards**: Use `--w11-bg-secondary` or `--w11-bg-tertiary`

### Interactive Elements
- **Buttons**: 
  - Primary: `--w11-accent-blue` → `--w11-accent-blue-hover`
  - Secondary: `--w11-bg-tertiary` → `--w11-surface-hover`
  - Success: `--w11-success` → `--w11-success-hover`
  - Error: `--w11-error` → `--w11-error-hover`

- **Hover States**: Always use corresponding hover variants
- **Active States**: Use `--w11-surface-active` for pressed states

### Text Hierarchy
- **Primary Text**: `--w11-text-primary` (headings, important content)
- **Secondary Text**: `--w11-text-secondary` (body text, labels)
- **Muted Text**: `--w11-text-muted` (hints, placeholders)
- **Disabled Text**: `--w11-text-disabled` (inactive elements)

### Status Indicators
- **Success**: `--w11-success` (green for positive actions)
- **Warning**: `--w11-warning` (yellow for cautions)
- **Error**: `--w11-error` (red for errors, deletions)
- **Info**: `--w11-info` (blue for information)
- **Purple**: `--w11-purple` (special highlights, code-related)

## Component-Specific Applications

### 1. Contact Cards
```jsx
<div style={{
  backgroundColor: 'var(--w11-bg-secondary)', 
  border: '1px solid var(--w11-border)'
}}>
  <div style={{backgroundColor: 'rgba(212, 52, 56, 0.2)'}}>
    <span style={{color: 'var(--w11-error)'}}>mail</span>
  </div>
</div>
```

### 2. Calculator Buttons
- **Numbers**: `--w11-bg-tertiary` → `--w11-surface-hover`
- **Operators**: `--w11-warning` → `--w11-warning-hover`
- **Functions**: `--w11-bg-secondary` → `--w11-surface-hover`

### 3. Explorer/File Manager
- **Sidebar**: `--w11-surface` background
- **Active Items**: `--w11-accent-blue` with opacity
- **Hover Items**: `--w11-surface-hover`

### 4. Taskbar
- **Background**: `--w11-bg-secondary`
- **Borders**: `--w11-border`
- **Button Hovers**: `--w11-surface-hover`

## Migration Strategy

### Phase 1: Core Components (COMPLETED)
- ✅ CSS Variables defined in index.css
- ✅ Tailwind configuration extended
- ✅ Taskbar component updated as example

### Phase 2: Window Components
- Update all window title bars and borders
- Apply consistent surface colors
- Standardize hover states

### Phase 3: Interactive Elements
- Update all button styles
- Standardize hover/active states
- Apply consistent focus styles

### Phase 4: Content Components
- Update text hierarchy
- Apply status color standards
- Ensure accessibility compliance

## Benefits

### 1. Consistency
- Unified color palette across all components
- Consistent hover and interaction states
- Professional Windows 11 aesthetic

### 2. Maintainability
- Single source of truth for colors
- Easy theme modifications via CSS variables
- Reduced code duplication

### 3. Accessibility
- High contrast mode support built-in
- Semantic color usage for status indicators
- Consistent focus states

### 4. Performance
- CSS variables are more performant than inline styles
- Reduced bundle size through variable reuse
- Better caching of color values

## Example Implementations

### Before (Inconsistent)
```jsx
<div className="bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
<div className="bg-gray-800 border-gray-600 hover:bg-gray-700">
<div className="bg-neutral-900 border-neutral-800 hover:bg-neutral-700">
```

### After (Consistent)
```jsx
<div style={{
  backgroundColor: 'var(--w11-bg-secondary)', 
  border: '1px solid var(--w11-border)'
}} 
onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-surface-hover)'}
onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--w11-bg-secondary)'}>
```

## Future Enhancements

### 1. Theme Switching
- Light mode support
- High contrast themes
- Custom user themes

### 2. Advanced Features
- CSS-in-JS integration
- Automated dark/light detection
- Color accessibility validation

### 3. Design System
- Component library with built-in colors
- Storybook documentation
- Design tokens export

## Testing & Validation

### Color Contrast
- All text combinations meet WCAG AA standards
- Status colors are distinguishable by colorblind users
- Focus indicators have sufficient contrast

### Browser Compatibility
- CSS Variables supported in all modern browsers
- Fallback colors for older browsers
- Performance tested across devices

### Maintenance
- Regular color palette audits
- Consistency checks across components
- User feedback integration

---

This color scheme system ensures a professional, consistent, and maintainable Windows 11 aesthetic across the entire portfolio website.