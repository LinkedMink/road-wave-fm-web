# Road Wave FM for Web — Project Context

## Overview

Road Wave FM for Web is a mobile-friendly React web application that provides a front-end interface to query data about terrestrial radio stations across the United States and Canada. Key features include location-based station discovery (with GPS tracking for road trips), Google Places autocomplete search, format filtering, and session persistence.

**Version:** 2.0.1-2
**Package:** `@linkedmink/road-wave-fm-web`
**Author:** Harlan Sang

## Tech Stack

- **Frontend framework:** React 19 with TypeScript 6
- **UI library:** Material-UI 9 (Emotion-based styling)
- **Routing:** react-router v8 with lazy-loaded route objects
- **State management:** `useReducer` + `Context` pattern (session, stations, formats, alerts reducers)
- **Build tool:** Webpack 5 with multiple environment configs
- **Transpilation:** ts-loader + Babel v8 (@babel/core ^8.0.0, preset-env/react/typescript ^8.0.0)
- **Styling:** SCSS + PostCSS with postcss-preset-env
- **Testing:** Jest 30 + jsdom + Testing Library
- **Linting/formatting:** ESLint 10 (typescript-eslint strict) + Prettier + lint-staged + Husky
- **Authentication:** JWT tokens + Ethereum (EIP-4361 / Sign-In with Ethereum) via ethers v6
- **Containerization:** Docker (multi-stage build, nginx deployment)

## Project Structure

```
config/
  webpackCommonConfig.ts      # Shared webpack config (entry, resolve, module rules, plugins)
  webpack.prod/dev/local.ts   # Environment-specific overrides
  webpack.serve.ts            # Dev server config
  jest.config.js              # Jest test configuration
  nginx.conf                  # Nginx reverse proxy configuration
src/
  index.tsx                   # Application entry point (StrictMode root, providers)
  components/
    App.tsx                   # Root component with lazy route definitions
    bootstrap/                # Auth guard, layout, error boundary, style bootstrap
    dashboard/                # Main station browsing UI
    account/                  # Account management (logout, profile)
    login/                    # JWT login flows
    login/ethereum/           # EIP-4361 Ethereum sign-in
    info/                     # About, documents, license, privacy policy pages
    shared/                   # SessionProvider, LoadingBackdrop, etc.
  environments/               # Config.production.ts, Config.development.ts, etc.
  hooks/                      # Custom React hooks (e.g., useEthereumWalletProviders)
  reducers/                   # sessionReducer, stationsReducer, formatsReducer, alertReducer
  types/                      # TypeScript type definitions (actions, models, ethers extensions)
  functions/                  # Utility functions (fetchAuthClient, math, errorTypeCheck, collection)
  definitions/                # Constants (alert, dashboard, ethereum, shared)
```

## Building and Running

| Command                 | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `npm start`             | Start dev server with webpack-dev-server (local env), opens browser |
| `npm run build`         | Production build with optimized webpack config                      |
| `npm run build:dev`     | Development build                                                   |
| `npm run build:local`   | Local environment build                                             |
| `npm run build:analyze` | Bundle size analysis                                                |
| `npm run build:docker`  | Docker image build via compose                                      |
| `npm test`              | Jest in watch mode                                                  |
| `npm run test:ci`       | CI-friendly test run with coverage                                  |
| `npm run test:debug`    | Debug mode (runInBand, no cache)                                    |
| `npm run lint`          | ESLint on all TS/JS source files                                    |
| `npm run format`        | Prettier write on all source files                                  |

### Docker

```bash
# Development container (watch mode with file sync)
docker compose --profile dev up --watch

# Production deployment
docker compose --profile deploy up -d

# Multi-platform production build
docker compose build web-env-production
```

Multi-stage Dockerfile: `dependencies` → `dev` (webpack-serve on :8080) / `build` (webpack prod) → `application` (nginx-proxy). Supports `linux/amd64` and `linux/arm64`.

## Development Conventions

- **ESM-only:** `"type": "module"` in package.json, fully ESM config files (`*.mjs`/`export default`)
- **Lazy routing:** All route components loaded via `lazy()` + dynamic `import()`, defined in `App.tsx`
- **Environment configs:** Target env selected at build time via `TARGET_ENV` env var; Webpack's `NormalModuleReplacementPlugin` swaps `Config.ts` → `Config.{env}.ts`
- **State pattern:** Global session state via `useReducer` + `Context`. Reducers are pure functions handling typed actions (`SessionActionType.SAVE/DESTROY/RESTORE`, etc.)
- **JWT auth client:** `fetchAuthClient.ts` manages bearer token injection; token persisted to `localStorage` with expiry check
- **Testing:** Jest tests co-located alongside source as `*.test.ts(x)` files; file/SVG mocks in `config/mocks/`
- **Git hooks:** Husky + lint-staged auto-prettifies all staged files (JS, TS, CSS, SCSS, JSON, HTML, Markdown)
- **TypeScript:** Extends `@tsconfig/node24`; strict type checking via ForkTsCheckerWebpackPlugin; ESM extension aliasing configured. TS6 requires explicit `rootDir` in both root and `src/tsconfig.json`, and `"types": ["google.maps"]` to resolve global namespace types under node16 resolution
- **CSS imports:** Side-effect CSS imports (e.g., `@fontsource/roboto/*.css`) require module declarations in `src/declarations.d.ts`; triple-slash `/// <reference types="@types/google.maps" />` directive also included there

## Dependency Update Rules

When updating NPM dependencies to new major versions:

- Use `npm outdated` to identify targets, then update `package.json` with **caret ranges** (`^`) for safe major bumps
- Exclude risky upgrades (e.g., TypeScript 7) unless explicitly requested
- **TypeScript:** Do not bump past TypeScript 6 — `typescript-eslint` v9 does not exist yet (latest v8 requires TS `<6.1.0`). If TS 7 becomes viable, also bump `typescript-eslint` to a v9+ release first. Note: ts-loader ^9.5.0 is compatible with TS 6 but may need bumping for TS 7.
- **ts-loader:** Bump to `^9.6.0`; earlier versions are incompatible with TypeScript 7 API changes.
- Always declare previously-implied deps explicitly (e.g., `@babel/core` was required by Babel v8 presets but wasn't listed)
- After bumping, verify with `npm run build && npm run lint && npm run test:ci`
- Fix breaking changes (TS6 stricter rootDir, unnecessary type assertions, CSS declaration gaps) before committing
- Bump prerelease version with `npm --no-git-tag-version version prerelease`

## Key Architectural Notes

1. **Router uses react-router v8 DOM API** — `createBrowserRouter` with `lazy()` route loading and `RouterProvider`. Route objects are exported from dedicated modules (e.g., `dashboardRouteObject.ts`). Note: v8 renamed `.data` to `.loaderData` in error handlers but the codebase doesn't use this pattern.

2. **Session lifecycle:** `SessionProvider` wraps the app tree. On mount, a `RESTORE` action loads JWT from localStorage (if not expired) and sets the bearer token on the fetch client. Login flows dispatch `SAVE`; logout dispatches `DESTROY`.

3. **Web Vitals:** Optionally enabled via `Config.ENABLE_WEB_VITALS`; logs CLS, FCP, INP, LCP, TTFB to console.

4. **External dependencies:** Google Maps (via `@types/google.maps`), Google Places API, and a backend data API (`PROXY_DATA_API_BASE_URL`) / user API (`PROXY_USER_API_BASE_URL`).

5. **Ethereum login:** Uses `ethers` v6 + custom EIP-4361 parser (`@linkedmink/eip-4361-parser`) for Sign-In with Ethereum flows under `/login/ethereum`.
