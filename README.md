# 🚀 Soumedhik's Interactive Portfolio

> **A Modern, Windows 11-Inspired Portfolio Experience**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-soumedhik.tech-0078d4?style=for-the-badge)](https://soumedhik.tech/)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

![Hits Counter](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fsoumedhik.tech&label=PORTFOLIO%20VISITS&icon=eye&color=%230078d4&message=&style=for-the-badge&tz=Asia%2FKolkata)

---

## 🌟 Overview

Experience my professional journey through an **innovative, interactive portfolio** that replicates the Windows 11 user interface. This immersive desktop-like experience showcases my expertise as an **AI Engineer & Problem Solver** specializing in AI research, machine learning, and innovative solutions.

### 🎯 **Live Demo**: [https://soumedhik.tech/](https://soumedhik.tech/)

---

## ✨ Key Features

### 🖥️ **Authentic Windows 11 Experience**

- **Interactive desktop environment** with drag-and-drop functionality
- **Real-time window management** with minimize/maximize/close operations
- **Windows 11 Fluent Design** animations and transitions
- **Glass morphism effects** with authentic shadows and blur
- **Sound system** with UI feedback and ambient background music
- **Z-index layering** for proper window stacking
- **Right-click context menus** for desktop interactions

### 📱 **Mobile-Optimized Design**

- **Landscape-first design** optimized for mobile devices
- **Touch-friendly interactions** with optimized touch targets
- **Responsive layout** that works seamlessly across all screen sizes
- **PWA capabilities** for app-like mobile experience
- **Adaptive UI** that adjusts to device capabilities

### 🤖 **Interactive Applications**

| Application | Description | Key Features |
|-------------|-------------|--------------|
| 📁 **File Explorer** | Browse portfolio sections | Project navigation, achievements showcase, education timeline |
| 🌐 **Web Browser** | Embedded browsing | External links, project demos, functional address bar |
| 💻 **VS Code Integration** | Live code showcase | Repository links, syntax highlighting, project files |
| 👤 **About Me** | Professional background | Experience timeline, education, skills, responsibilities |
| 📞 **Contact Hub** | Interactive contact | Direct communication channels, social links |
| 🔗 **LinkedIn Integration** | Professional network | Direct LinkedIn profile access |
| 🖼️ **Pictures Gallery** | Visual showcase | Image viewer with smooth transitions, project screenshots |
| 🤖 **Portfolio Chatbot** | AI-powered assistant | Google Gemini API integration, CV context-aware |

### 🚀 **Performance & SEO Excellence**

- **Lighthouse Score: 95+** across all metrics (Performance, Accessibility, SEO)
- **Core Web Vitals optimized** for excellent user experience
- **Code splitting & lazy loading** for fast initial page load (< 2s on 3G)
- **Image optimization** with WebP format and progressive loading
- **Service Worker** with PWA capabilities and offline caching
- **JSON-LD structured data** for enhanced search engine understanding
- **Vercel Analytics** and Speed Insights integration
- **Production console cleanup** - no debug logs in production

### 🎨 **Modern Design System**

- **Unified color palette** with 22 CSS variables for consistency
- **5 reusable Win11 components** (WindowTitleBar, IconContainer, GlassCard, Win11Button, LoadingSpinner)
- **Utility hook** (`useResponsive`) for adaptive layout metrics
- **11 CSS utility classes** for consistent styling across all components
- **Hardware-accelerated animations** running at 60fps
- **Custom Windows 11 easing curve** `[0.76, 0, 0.24, 1]` for authentic feel
- **Volume control system** with individual sound level management

### 🔔 **Streamlined System Feedback**

- **Replaced the full notification center** with lightweight glassmorphism toast banners
- **Widgets panel removed** for a cleaner desktop canvas and less visual clutter
- **Quick Settings & System Tray** remain accessible from the taskbar with enhanced acrylic styling
- **Contextual toasts** confirm actions like window minimize, snap layouts, and system status checks

---

## 🛠️ Technology Stack

### **Frontend Technologies**

```javascript
React 18.2.0          // Modern React with hooks, context, and Suspense
Framer Motion 11.0.6  // Advanced animations and transitions
React Router 6.22.3   // Client-side routing
Tailwind CSS 3.4.1    // Utility-first styling with custom Win11 theme
React Draggable 4.4.6 // Advanced drag-and-drop functionality
DaisyUI 4.12.24       // UI component library
```

### **APIs & Integrations**

- **Google Gemini AI (2.5 Flash Lite)** - Intelligent chatbot with CV context extraction
- **Vercel Analytics** - Real-time performance monitoring and user insights
- **Speed Insights** - Core Web Vitals tracking
- **Custom Sound System** - Centralized audio management with volume controls

### **Performance & SEO Tools**

- **Service Worker** - PWA capabilities, offline support, and asset caching
- **Image Optimization** - WebP format with fallbacks, progressive loading
- **Bundle Optimization** - Code splitting, tree shaking, lazy loading
- **JSON-LD** - Structured data for enhanced search engine results
- **Webpack Bundle Analyzer** - Bundle size optimization tool

---

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** 14.0 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/soumedhik/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables** (Optional - for AI Chatbot)

   Create a `.env` file in the root directory:

   ```env
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   REACT_APP_GEMINI_MODEL=gemini-2.5-flash-lite
   # Optional monitoring toggles (render analytics components only when enabled)
   REACT_APP_ENABLE_VERCEL_ANALYTICS=true
   REACT_APP_ENABLE_SPEED_INSIGHTS=true
   ```

   > Omit or set the monitoring flags to `false` in environments where Vercel Analytics or Speed Insights are not provisioned to avoid 404 console errors.

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at http://localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm run build:dev` | Create development build with sourcemaps |
| `npm run serve` | Serve production build locally |
| `npm run analyze` | Analyze bundle size with interactive treemap |
| `npm test` | Run test suite |

### **Production Build**

1. **Create optimized production build**

   ```bash
   npm run build
   # or
   yarn build
   ```

   This creates a `build/` directory with optimized production files:
   - Minified JavaScript and CSS
   - Optimized images and assets
   - Service worker for PWA capabilities
   - No sourcemaps for security

2. **Test production build locally** (Optional)

   ```bash
   npm run serve
   # or
   npx serve -s build
   ```

   Visit [http://localhost:3000](http://localhost:3000) to test the production build

3. **Analyze bundle size** (Optional)

   ```bash
   npm run analyze
   ```

   This opens an interactive treemap visualization of bundle contents to help identify optimization opportunities.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── apps/                    # Individual application components
│   │   ├── AboutMe.jsx          # Professional background showcase
│   │   ├── Apps.jsx             # Windows 11 "All Apps" catalog
│   │   ├── Browser.jsx          # Microsoft Edge simulation
│   │   ├── Explorer.jsx         # File explorer with project navigation
│   │   ├── GitHub.jsx           # External GitHub redirect handler
│   │   ├── Notepad.jsx          # Windows 11 glass AI chatbot (Gemini)
│   │   ├── Pictures.jsx         # Image gallery viewer
│   │   ├── Videos.jsx           # Curated video gallery
│   │   └── ContactMe.jsx        # Contact information hub
│   ├── layout/                  # Layout components
│   │   ├── Taskbar.jsx          # Windows 11 taskbar
│   │   ├── StartMenu.jsx        # Start menu functionality
│   │   └── Desktop.jsx          # Desktop environment
│   ├── utilities/               # Utility components
│   │   ├── RightClick.jsx       # Context menu
│   │   ├── QuickSettings.jsx    # Action center shortcut panel
│   │   ├── SnapLayouts.jsx      # Windows 11 snap layout helper
│   │   ├── SystemTray.jsx       # System telemetry dashboard
│   │   ├── VideoBackground.jsx  # Live wallpaper
│   │   └── Win11VolumeSlider.jsx # Fluent volume slider UI
│   ├── user/                    # User profile components
│   │   └── Login.jsx            # Lock screen
│   └── common/
│       └── Win11Components.jsx  # Reusable Win11 UI components
├── data/
│   └── data.js                  # Portfolio content (single source of truth)
├── hooks/
│   └── useResponsive.js         # Custom responsive & optimization hooks
├── Pages/
│   ├── main.js                  # Main desktop environment controller
│   └── lockscreen.js            # Lock screen interface
├── utils/
│   ├── soundManager.js          # Centralized audio system
│   └── win11Animations.js       # Windows 11 animation variants
├── styles/
│   └── index.css                # Global styles & CSS variables
└── App.js                       # Root application component
```

---

## 🎨 Customization Guide

### **Update Portfolio Content**

Edit `src/data/data.js` to customize:

- **Personal Information**: Name, title, contact details
- **Work Experience**: Job history with descriptions
- **Research Experience**: Academic research and publications
- **Education**: Academic background and institutions
- **Projects**: Portfolio projects with links and descriptions
- **Skills**: Technical skills and proficiencies
- **Achievements**: Awards, certifications, and responsibilities
- **GitHub Repositories**: Featured repos with stats

Example structure:

```javascript
export const profileDescription = "Your professional summary...";

export const workExperience = [
  {
    id: 1,
    company: "Company Name",
    role: "Your Role",
    duration: "Jan 2023 - Present",
    description: "What you do...",
    skills: ["Skill1", "Skill2"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description...",
    technologies: ["React", "Node.js"],
    link: "https://project-url.com",
    github: "https://github.com/username/repo"
  }
];
```

### **Theme Customization**

Modify `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'win11-accent': '#0078d4',      // Primary accent color
  'win11-bg': '#1e1e1e',          // Background color
  'win11-surface': '#2d2d2d',     // Surface/card background
  'win11-hover': '#3a3a3a',       // Hover state color
  // ... customize other colors
}
```

Or edit CSS variables in `src/index.css`:

```css
:root {
  --win11-accent: #0078d4;
  --win11-bg: #1e1e1e;
  --win11-surface: #2d2d2d;
  --win11-text: #ffffff;
  /* ... other variables */
}
```

### **Sound System Configuration**

Customize sounds in `src/utils/soundManager.js`:

1. Replace audio files in `public/audio/`
2. Modify volume levels and preloading behavior
3. Add new sound effects for custom interactions

Available sounds:
- `startup`, `shutdown`
- `windowOpen`, `windowClose`
- `minimize`, `maximize`
- `buttonClick`, `hover`
- `typing`, `ambientMusic`

### **Add New Applications**

1. Create component in `src/components/apps/YourApp.jsx`
2. Add lazy import in `src/Pages/main.js`:
   ```javascript
   const YourApp = lazy(() => import('../components/apps/YourApp'));
   ```
3. Register in `windows` state object
4. Add taskbar integration in `src/components/layout/Taskbar.jsx`
5. Add sound effects via `soundManager.play('soundName')`

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/soumedhik/portfolio)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### **Deploy to Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### **Deploy to GitHub Pages**

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

### **Other Hosting Options**

- **Firebase Hosting**: Use Firebase CLI and deploy `build/` folder
- **AWS S3**: Upload `build/` folder to S3 bucket with static hosting
- **Cloudflare Pages**: Connect GitHub repo for automatic deployments

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| iOS Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | 90+ | ✅ Fully Supported |

### **Performance Benchmarks**

- 🚀 **Load Time**: < 2s on 3G networks
- 📊 **Lighthouse Performance**: 95+
- 🎯 **SEO Score**: 100/100
- ♿ **Accessibility**: 95+
- ✅ **Best Practices**: 95+
- 📱 **Mobile Score**: 90+
- 🔒 **Security**: HTTPS enforced

---

## 📚 Documentation

For detailed guides and documentation:

- **[Sound System Guide](docs/SOUND_SYSTEM_GUIDE.md)** - Audio management and customization
- **[AI Chatbot Documentation](docs/AI_CHATBOT_DOCUMENTATION.md)** - Chatbot setup and configuration
- **[Performance Optimization](docs/PERFORMANCE_OPTIMIZATION_GUIDE.md)** - Optimization techniques
- **[Win11 Animation Integration](docs/WIN11_ANIMATION_INTEGRATION_GUIDE.md)** - Animation patterns
- **[Responsive Design](docs/RESPONSIVE_DESIGN.md)** - Mobile optimization strategies
- **[Easter Eggs Guide](docs/EASTER_EGGS_GUIDE.md)** - Hidden features and Easter eggs

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. **Fork** the project
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please make sure to:
- Follow the existing code style
- Update documentation as needed
- Test your changes thoroughly
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Soumedhik Bharati**

- 🌐 Portfolio: [https://soumedhik.tech/](https://soumedhik.tech/)
- 💼 LinkedIn: [linkedin.com/in/soumedhik](https://linkedin.com/in/soumedhik)
- 📧 Email: soumedhikbharati@gmail.com
- 🐙 GitHub: [@soumedhik](https://github.com/soumedhik)

---

## 🙏 Acknowledgments

- **Microsoft** - For the Windows 11 design inspiration and Fluent Design System
- **React Team** - For the amazing React framework and developer tools
- **Vercel** - For excellent deployment platform and analytics
- **Google** - For Gemini AI API integration
- **Open Source Community** - For the incredible tools and libraries that made this possible

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/soumedhik/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/soumedhik/portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/soumedhik/portfolio?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/soumedhik/portfolio)
![GitHub language count](https://img.shields.io/github/languages/count/soumedhik/portfolio)
![GitHub top language](https://img.shields.io/github/languages/top/soumedhik/portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/soumedhik/portfolio)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by Soumedhik Bharati**

[🌐 Visit Portfolio](https://soumedhik.tech/) • [📧 Get in Touch](mailto:soumedhikbharati@gmail.com) • [💼 Connect on LinkedIn](https://linkedin.com/in/soumedhik)

</div>