## Project Architecture

This project follows a clean architecture pattern with strict layer separation:

- `src/domain/` — TypeScript types and interfaces only (`Task`, `Student`, etc.). Zero logic, zero dependencies.
- `src/application/` — Use cases and business logic. No UI imports allowed here. Each use case is a single-responsibility function or class.
- `src/infrastructure/` — Firebase services, API clients, external integrations, repository implementations.
- `src/shared/` — Utility functions, constants, helpers, and types shared across layers. No layer-specific logic.
- `src/ui/` — All presentation layer: pages, components, hooks, and assets.
  - `src/ui/pages/` — Page-level components. `HomePage.tsx` is the only page and owns all state.
  - `src/ui/components/task/` — `TaskForm`, `TaskList`, `TaskItem`
  - `src/ui/components/student/` — `StudentInfo`, `StudentRegisterDialog`

## Layering Rules (Strictly Enforced)

- `domain` has zero dependencies on any other layer.
- `application` may import from `domain` and `shared` only. Never from `ui` or `infrastructure`.
- `infrastructure` may import from `domain`, `application`, and `shared`. Never from `ui`.
- `ui` may import from all layers. It is the only layer allowed to use React/JSX.
- Never put business logic inside components, hooks are acceptable only for UI state and side-effect orchestration.

## State Management

All state lives in `HomePage.tsx`. Handler functions (`addTask`, `onComplete`, `onRegister`) delegate to use cases in `src/application/`. No direct infrastructure calls from components.

## Mixed JS/TS

Entry point (`main.jsx`) and `App.jsx` are plain JSX. All components under `src/ui/` are `.tsx`. Domain types are `.ts`. Keep all new files as `.tsx` or `.ts` — never create new `.js` or `.jsx` files.

## ESLint

`eslint.config.js` currently only targets `**/*.{js,jsx}`. TypeScript files are not linted by the current config. Do not assume TS files are clean — review manually.

## UI/UX Standards

- **Mobile-first:** All components are built for mobile viewports first, then scaled up with responsive breakpoints.
- **Responsive:** Every layout must work correctly from 320px to 1440px+. Use relative units (`rem`, `%`, `fr`) over fixed `px`.
- **Light theme only:** No dark mode unless explicitly requested. Maintain a clean, accessible light palette.
- **Accessible:** Use semantic HTML, proper ARIA labels, and sufficient color contrast (WCAG AA minimum).
- **Consistent spacing and hierarchy:** Follow an 8pt spacing scale. Typography must have clear visual hierarchy.
- **No layout shifts:** Avoid UI that jumps or reflows after data loads. Use skeleton loaders when async data is involved.

## Firebase Standards

- Use Firebase v9+ modular SDK (tree-shakeable imports only). Never use the compat layer.
- All Firebase initialization lives in `src/infrastructure/firebase/firebaseConfig.ts`.
- Firestore, Auth, and Storage logic lives in `src/infrastructure/` under their respective subfolders.
- Never call Firebase directly from `ui` or `application` — always go through a repository or service abstraction in `infrastructure`.
- Environment variables for Firebase config must use the `VITE_` prefix and live in `.env.local` (never committed).
- Deployment target is Firebase Hosting. `firebase.json` and `.firebaserc` must be kept at project root and not modified without reason.

## PWA Requirements

- A Web App Manifest (`manifest.json`) must be present and linked in `index.html`.
- A service worker must be registered. Use `vite-plugin-pwa` for generation and configuration.
- Required manifest fields: `name`, `short_name`, `start_url`, `display: standalone`, `background_color`, `theme_color`, and at least icon sizes `192x192` and `512x512`.
- The app must be fully usable offline or show a meaningful offline fallback. Do not leave the service worker as a no-op stub.
- Lighthouse PWA score must stay at 100 (installable + all PWA checks passing).