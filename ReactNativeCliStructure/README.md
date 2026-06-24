# ⚛️ ReactNativeCliStructure

A production-ready **React Native CLI** boilerplate with TypeScript, supporting Android and iOS.

## Tech Stack

| Technology   | Version     |
| ------------ | ----------- |
| React Native | 0.86.0      |
| React        | 19.2.3      |
| TypeScript   | ^5.8.3      |
| RN CLI       | 20.1.0      |
| Node.js      | >= 22.11.0  |

## Quick Start

```bash
git clone https://github.com/darshan8699/RN_Basic_Structure.git
cd RN_Basic_Structure/ReactNativeCliStructure
npm install
npm start
```

## Run Commands

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm start`        | Start Metro bundler           |
| `npm run android`  | Run on Android emulator/device|
| `npm run ios`      | Run on iOS simulator/device   |
| `npm run lint`     | Run ESLint                    |
| `npm run test`     | Run Jest unit tests           |
| `npm run doctor`   | Run React Native Doctor       |

## 📁 Folder Structure

```
ReactNativeCliStructure/
│
├── src/
│   ├── pages/                    # Navigation — screens & navigators
│   │   ├── auth/                 # Auth screens (login, signup)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── main/                 # Main tabs/pages (home, account, setting)
│   │       ├── home/
│   │       ├── account/
│   │       └── setting/
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
├── android/                      # Android native project
├── ios/                          # iOS native project
├── __tests__/                    # Unit tests
├── index.js                      # App entry point
├── App.tsx                       # Root App component
├── app.json                      # App config
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler configuration
├── jest.config.js                # Jest configuration
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.js                  # ESLint configuration
└── .prettierrc.js                # Prettier configuration
```

## 📄 Documentation

Full documentation in [`docs.md`](./docs.md):

- Prerequisites · Create Project · Installation
- Folder Structure · Android · iOS · Troubleshooting

---

**Author:** [Darshan Rana](https://github.com/darshan8699)
