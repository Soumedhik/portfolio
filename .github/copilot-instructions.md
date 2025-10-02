
# 🧑‍💻 Copilot Instructions for Soumedhik's Windows 11 Portfolio

## Big Picture Architecture
- **React SPA** with Windows 11 desktop simulation: All UI logic in `src/`, main apps in `src/components/apps/` (AboutMe, Calculator, PortfolioChatbot, etc.).
- **Desktop/Taskbar/Window Management**: Centralized in `src/Pages/main.js` using React state. Windows are draggable (titlebar only), minimizable, and support z-index layering.
- **Personal/Professional Data**: Structured in `src/data/data.js` (research, work, projects, skills, responsibilities, GitHub repos). This file is the single source of truth for portfolio content and chatbot context.
- **Sound System**: Managed by `src/utils/soundManager.js`, with all UI sounds preloaded from `public/audio/`. Use `soundManager.play('soundName')` for feedback.
- **AI Chatbot**: Powered by Google Gemini API (`PortfolioChatbot.jsx`). Dynamically injects CV context from `/public/Curriculum Vitae.pdf` and `data.js`. Strict prompt engineering: answers only portfolio-related questions, plain text only, professional/concise style.
- **Styling**: Windows 11 look via custom Tailwind CSS variables (`win11-bg`, `win11-surface`, etc.) in `tailwind.config.js`. Animations use Framer Motion with `[0.76, 0, 0.24, 1]` easing curve for authentic Windows 11 feel.

## Developer Workflows
- **Install**: `npm install` (Node.js 14+ required)
- **Dev Server**: `npm start` (http://localhost:3000)
- **Build**: `npm run build` (outputs to `build/`)
- **Serve Production**: `npm run serve` or `npx serve -s build`
- **Bundle Analysis**: `npm run analyze` (webpack-bundle-analyzer for optimization)
- **Add Apps**: Create component in `src/components/apps/`, register in `main.js` windows state, add to taskbar logic.
- **Environment Variables**: Configure Gemini API and CV path in `.env` (see `docs/CHATBOT_UPDATES_GUIDE.md`).

## Project-Specific Patterns
- **App Registration**: New apps require (1) component in `src/components/apps/`, (2) entry in `main.js` windows object, (3) taskbar integration.
- **Window Management**: Use React state in `main.js` for open/close/minimize. Drag boundaries via `constraintsRef`.
- **Sound Integration**: Import `soundManager` and call `soundManager.play('soundName')` for all UI events. Sounds are preloaded for performance.
- **AI Chatbot Prompting**: See `docs/ENHANCED_PROMPT_SYSTEM.md` and `PortfolioChatbot.jsx` for strict prompt guidelines and context injection. Only answer portfolio-related questions, no markdown formatting.
- **Easter Eggs**: Calculator and other apps may have hidden features (see `docs/EASTER_EGGS_GUIDE.md`).

## Integration Points & External Dependencies
- **AI Chatbot**: Google Gemini API, dynamic CV parsing, context from `data.js`.
- **SEO**: JSON-LD in `App.js`, meta tags in `public/index.html`.
- **PWA**: Service worker in `public/sw.js` (registered in `App.js`).
- **Analytics**: Vercel Analytics, Speed Insights.
- **Sound System**: Centralized in `soundManager.js`, assets in `public/audio/`.
- **Deployment**: Vercel with custom headers, caching, and security policies in `vercel.json`.

## Key Files & Directories
- `src/components/apps/` — App components (File Explorer, Calculator, PortfolioChatbot, etc.)
- `src/data/data.js` — Portfolio data (research, work, projects, skills, responsibilities, GitHub repos)
- `src/Pages/main.js` — Desktop/window/taskbar state management
- `src/utils/soundManager.js` — Audio system
- `public/audio/` — UI sound effects
- `tailwind.config.js` — Windows 11 theming

## Example Patterns
- **Adding an App**: Create `src/components/apps/NewApp.jsx`, register in `main.js`, update window/taskbar logic, add sound events.
- **Sound Integration**: `import soundManager from '../utils/soundManager'; soundManager.play('buttonClick');`
- **AI Chatbot Prompt**: Strict guidelines, context from CV and `data.js`, plain text only, see `PortfolioChatbot.jsx` and `docs/ENHANCED_PROMPT_SYSTEM.md`.

---

**If any conventions or patterns are unclear, ask the user for clarification before making major changes.**
