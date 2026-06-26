# 🚀 expo-structure

A production-ready **Expo** boilerplate with TypeScript, Expo Router, GraphQL, Sentry, and full developer tooling — formatting, conventional commits, automated releases, and security scanning.

## Tech Stack

| Technology   | Version   |
| ------------ | --------- |
| Expo SDK     | ~56.0.12  |
| React Native | 0.85.3    |
| React        | 19.2.3    |
| TypeScript   | ~6.0.3    |
| Expo Router  | ~56.2.11  |
| Node.js      | 24        |

## Quick Start

```bash
git clone https://github.com/darshan8699/expo-structure.git
cd expo-structure
npm install
npx expo start
```

## Developer Tooling

| Tool | Purpose |
| ---- | ------- |
| **Prettier** | Auto-format code on commit (`.prettierrc.json`) |
| **ESLint** + `eslint-config-prettier` | Lint + formatting rule conflicts resolved |
| **Commitlint** | Enforces conventional commit messages |
| **lint-staged** | Runs lint+format only on staged files (fast commits) |
| **Husky** | Git hooks — `pre-commit` (lint-staged) + `commit-msg` (commitlint) |
| **Semantic Release** | Auto version bump + CHANGELOG + GitHub Release on `main` |
| **GitLeaks** | Scans git history for accidentally committed secrets |
| **npm audit** | Checks dependencies for known CVE vulnerabilities |
| **Codacy** | Coverage reporting uploaded from `develop` CI runs |

## npm Scripts

### Dev Server

| Script | Description |
| ---------------------- | ------------------------------------ |
| `npm start` | Start Expo dev server |
| `npm run start:clear` | Start with cache cleared |
| `npm run start:dev` | Start with dev-client |
| `npm run start:tunnel` | Start with tunnel (physical devices) |
| `npm run start:lan` | Start on LAN |

### Run Platform

| Script | Description |
| ----------------- | --------------------- |
| `npm run android` | Open Android emulator |
| `npm run ios` | Open iOS simulator |
| `npm run web` | Open in browser |

### Code Quality

| Script | Description |
| ----------------------- | --------------------------------- |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint errors |
| `npm run format` | Format all `src/` files (Prettier) |
| `npm run format:check` | Check formatting (used in CI) |
| `npm run test` | Run Jest unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run doctor` | Run Expo Doctor health check |

### Build (EAS Cloud)

| Script | Platform | Purpose |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| `npm run build:dev:android` | Android | Development build |
| `npm run build:dev:ios` | iOS | Development build (Physical Device — paid Apple Dev Account req.) |
| `npm run build:dev:ios-sim` | iOS | Development build (Simulator — Free) |
| `npm run build:dev:all` | Both | Development build |
| `npm run build:staging:android` | Android | Staging / QA build |
| `npm run build:staging:ios` | iOS | Staging / QA build |
| `npm run build:prod:android` | Android | Production build |
| `npm run build:prod:ios` | iOS | Production build |
| `npm run build:web` | Web | Export static web build |

### Submit to Stores

| Script | Description |
| ------------------------ | --------------------------- |
| `npm run submit:android` | Submit to Google Play Store |
| `npm run submit:ios` | Submit to Apple App Store |

## CI/CD — GitHub Actions

| Workflow | Job | Triggers |
| ------------- | --------------------------------------------------- | -------------------- |
| `ci.yml` | `expo-ci`: format:check → lint → test → expo-doctor | All pushes + PRs |
| `ci.yml` | `test-coverage` + Codacy upload | `develop` push only |
| `ci.yml` | `semantic-release`: version bump + CHANGELOG | `main` push only |
| `ci.yml` | `eas-build`: cloud builds | `main` push + manual |
| `security.yml`| GitLeaks secrets scan + `npm audit` | All pushes + PRs |

> Semantic release is `main`-only — it creates real versioned releases when merging to production.

## 📁 Folder Structure

```
expo-structure/
│
├── src/
│   ├── app/                      # Navigation — Expo Router (file = route)
│   │   ├── _layout.tsx           # Root layout + providers
│   │   └── index.tsx             # Entry screen
│   │
│   ├── assets/                   # Static files (images, fonts, animations, sounds)
│   │
│   ├── common/                   # Global shared code (no React components)
│   │   ├── enums/                # TypeScript enums
│   │   ├── theme/                # Colors, typography, spacing tokens
│   │   ├── types/                # Global TypeScript interfaces & types
│   │   └── utils/                # Pure utility functions
│   │
│   ├── components/               # UI components
│   │   ├── common/               # Reusable across any screen (Button, Input, Modal…)
│   │   └── modules/              # Feature-specific components (auth/, home/, profile/…)
│   │
│   ├── config/                   # App configuration (env, sentry, notifications)
│   │
│   ├── data/                     # Static/hardcoded data (menus, fixtures)
│   │
│   ├── services/                 # App services — state, hooks, context
│   │   ├── context/              # React Context definitions
│   │   ├── hooks/                # Custom React hooks
│   │   ├── providers/            # Context providers wrapping the app
│   │   ├── redux/                # Redux store & slices (if using Redux)
│   │   └── store/                # Zustand stores (if using Zustand)
│   │
│   ├── shims/                    # Native module compatibility shims
│   │
│   └── apis/                     # Network layer — client, interceptors, endpoints
│
├── .github/
│   └── workflows/
│       ├── ci.yml                # CI/CD — lint, test, coverage, release, EAS build
│       └── security.yml          # Security — GitLeaks + npm audit
│
├── .husky/
│   ├── pre-commit                # Runs lint-staged on staged files
│   └── commit-msg                # Validates conventional commit message
│
├── scripts/
│   └── reset-project.js          # Script to reset project to blank state
│
├── __tests__/                    # Unit tests
├── app.json                      # Expo app config
├── babel.config.js               # Babel — reanimated plugin + import.meta support
├── commitlint.config.ts          # Commitlint — conventional commits rules
├── eas.json                      # EAS build profiles (development/staging/production)
├── eslint.config.js              # ESLint + eslint-config-prettier
├── jest.config.js                # Jest configuration
├── .lintstagedrc.json            # lint-staged — lint:fix + format on staged files
├── .npmrc                        # npm — legacy-peer-deps + engine-strict
├── .prettierrc.json              # Prettier formatting rules
└── tsconfig.json                 # TypeScript configuration
```

## 📄 Documentation

Full documentation in [`docs/docs.md`](./docs/docs.md):

- Prerequisites · Create Project · Installation
- Folder Structure · Android · iOS · Web · Dev Build
- Developer Tooling · CI/CD & GitHub Actions · Troubleshooting

---

**Author:** [Darshan Rana](https://github.com/darshan8699)
