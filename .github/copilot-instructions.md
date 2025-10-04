
# 🧑‍💻 Copilot Instructions for Soumedhik's Windows 11 Portfolio
> Quick brief for agents jumping into this React desktop simulation.

## Quick start
- Install deps with `npm install` (Node 16+ recommended); dev server runs via `npm start` on port 3000.
- `npm run build` generates the production bundle (no sourcemaps); `npm run build:dev` keeps sourcemaps for debugging.
- Tests run with `npm test` (Jest, passWithNoTests) but the suite is minimal; lean on smoke-testing via the browser.

## Architecture map
- React SPA rooted in `src/App.js`, routed to `src/Pages/main.js` which orchestrates the Windows 11 desktop shell.
- Desktop icons and taskbar buttons render from `appsData` in `src/data/data.js`; updates here drive both layout and window routing.
- `src/components/layout/Taskbar.jsx`, `StartMenu.jsx`, and `Desktop.jsx` compose the shell; utilities live under `src/components/utilities/`.

## Window lifecycle
- `createWindowState` and `createMinimizedState` in `src/constants/windows.js` enforce single-active windows; toggles rebuild state via `createWindowState()` so avoid mutating state inline.
- Draggable chrome is provided by `react-draggable` inside each app; respect the `.title-bar` handle pattern to keep drag boundaries working.
- When adding apps, wire `MINIMIZABLE_WINDOWS`, `Taskbar.jsx`, and the `windows` + `minimizedWindows` state maps in `main.js`.

## Data & content sources
- All portfolio content (experience, projects, achievements, etc.) lives in `src/data/data.js`; extend arrays instead of inlining strings inside components.
- AI copy for the chatbot loads extra context from `public/soumedhik_info.txt` and the CV PDF in `public/`.
- Asset paths assume files under `public/images`, `public/audio`, and `public/pictures`; keep new assets in those folders to avoid bundler issues.

## Sound & UX cues
- `src/utils/soundManager.js` centralizes audio with fallback chains, volume persistence, and ambient Comfort Chain playback; always call `soundManager.play(...)` instead of instantiating `Audio`.
- `SoundEffects.jsx` auto-binds hover/click sounds to elements with `.taskbar-item`, `.window-control`, etc.—reuse these classes or add listeners there for new UI.
- Animations share easing from `src/utils/win11Animations.js`; use `win11Easing` and `win11Duration` for consistent motion.

## AI assistant (Notepad app)
- `src/components/apps/Notepad.jsx` wraps Google Gemini via `@google/generative-ai`; requires `REACT_APP_GEMINI_API_KEY` and `REACT_APP_GEMINI_MODEL` env vars.
- Responses are typed with the custom `typeMessage` helper and prefixed with "Soumedhik"; preserve the prompt rules when changing assistant behavior.
- The chatbot depends on `minimizeWindow('notepad')` and `toggleNotepad` from `main.js`; ensure new shortcuts call those helpers for consistency.

## Helpful references
- Animation & motion guidelines: `docs/PORTFOLIO_ANIMATION_GUIDE.md`
- Chatbot prompt system: `docs/ENHANCED_PROMPT_SYSTEM.md` and `docs/CHATBOT_UPDATES_GUIDE.md`
- Volume mixer behavior and expected APIs: `docs/VOLUME_CONTROL_DOCUMENTATION.md`
- Deployment expectations (Vercel headers, caching): `vercel.json` + `docs/DEPLOYMENT_GUIDE.md`
