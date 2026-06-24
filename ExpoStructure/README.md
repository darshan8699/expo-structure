# 🚀 ExpoStructure

A production-ready **Expo** boilerplate with TypeScript, Expo Router, and support for Android, iOS, and Web.

## Tech Stack

| Technology   | Version  |
| ------------ | -------- |
| Expo SDK     | ~56.0.12 |
| React Native | 0.85.3   |
| React        | 19.2.3   |
| TypeScript   | ~6.0.3   |
| Expo Router  | ~56.2.11 |

## Quick Start

```bash
git clone https://github.com/darshan8699/RN_Basic_Structure.git
cd RN_Basic_Structure/ExpoStructure
npm install
npx expo start
```

## Run Commands

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm start`          | Start Expo dev server              |
| `npm run start:clear`| Start with cleared cache           |
| `npm run start:dev`  | Start with dev client              |
| `npm run start:tunnel`| Start with tunnel (remote device) |
| `npm run android`    | Run on Android                     |
| `npm run ios`        | Run on iOS                         |
| `npm run web`        | Run on Web                         |
| `npm run lint`       | Run ESLint                         |
| `npm run lint:fix`   | Run ESLint with auto-fix           |
| `npm run test`       | Run Jest unit tests                |
| `npm run doctor`     | Run Expo Doctor                    |

## Build Commands (EAS)

| Command                        | Description                              |
| ------------------------------ | ---------------------------------------- |
| `npm run build:dev:android`    | Development build — Android              |
| `npm run build:dev:ios`        | Development build — iOS device           |
| `npm run build:dev:ios-sim`    | Development build — iOS Simulator        |
| `npm run build:dev:all`        | Development build — All platforms        |
| `npm run build:staging:android`| Staging build — Android                  |
| `npm run build:staging:ios`    | Staging build — iOS                      |
| `npm run build:staging:all`    | Staging build — All platforms            |
| `npm run build:prod:android`   | Production build — Android               |
| `npm run build:prod:ios`       | Production build — iOS                   |
| `npm run build:prod:all`       | Production build — All platforms         |
| `npm run build:web`            | Export web build                         |
| `npm run submit:android`       | Submit Android build to Play Store       |
| `npm run submit:ios`           | Submit iOS build to App Store            |

## 📁 Folder Structure

```
ExpoStructure/
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
├── scripts/
│   └── reset-project.js          # Script to reset project to blank state
│
├── __tests__/                    # Unit tests
├── app.json                      # Expo app config
├── eas.json                      # EAS build profiles (development/staging/production)
├── jest.config.js                # Jest configuration
├── eslint.config.js              # ESLint configuration
├── tsconfig.json                 # TypeScript configuration
└── expo-env.d.ts                 # Expo environment type declarations
```

## 📄 Documentation

Full documentation in [`docs.md`](./docs.md):

- Prerequisites · Create Project · Installation
- Folder Structure · Android · iOS · Web · Dev Build · Troubleshooting

---

**Author:** [Darshan Rana](https://github.com/darshan8699)
