# 📚 expo-structure — Documentation

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Project](#create-project)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [Run on Android](#run-on-android)
6. [Run on iOS](#run-on-ios)
7. [Run on Web](#run-on-web)
8. [Expo Go vs Development Build](#expo-go-vs-development-build)
9. [Convert to Development Build](#convert-to-development-build)
10. [Troubleshooting](#troubleshooting)
11. [Tools & Features](#tools--features)
12. [NPM Install vs CI](#npm-install-vs-ci)

---

## Prerequisites

| Tool           | Version | Purpose                    |
| -------------- | ------- | -------------------------- |
| Node.js        | >= 18   | JavaScript runtime         |
| EAS CLI        | Latest  | Cloud builds               |
| Android Studio | Latest  | Android emulator           |
| Xcode          | Latest  | iOS simulator (macOS only) |
| Expo Go        | Latest  | Run on physical device     |

```bash
# Install EAS CLI globally
npm install -g eas-cli
```

---

## Create Project

```bash
# Default (Expo Router + TypeScript)
npx create-expo-app@latest MyAppName

# Blank TypeScript
npx create-expo-app@latest MyAppName --template blank-typescript

# Navigate into project
cd MyAppName

# Install dependencies
npm install

# Start app
npx expo start
```

---

## Installation

```bash
# Clone repo
git clone https://github.com/darshan8699/expo-structure.git
cd expo-structure

# Install dependencies
npm install

# Start dev server
npx expo start
```

---

## Folder Structure

```
src/
├── app/                        # Expo Router (file-based routing)
│   ├── _layout.tsx             # Root layout shell
│   ├── index.tsx               # Home → /
│   └── explore.tsx             # Explore → /explore
├── components/                 # Reusable UI components
│   ├── animated-icon.tsx
│   ├── app-tabs.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
│       └── collapsible.tsx
├── constants/
│   └── theme.ts                # Colors, spacing, typography
├── hooks/
│   ├── use-color-scheme.ts     # Light/dark mode
│   └── use-theme.ts            # Theme colors hook
└── global.css                  # Global styles (web)
```

**Expo Router file → route mapping:**

| File              | Route                |
| ----------------- | -------------------- |
| `app/index.tsx`   | `/`                  |
| `app/explore.tsx` | `/explore`           |
| `app/[id].tsx`    | `/123` (dynamic)     |
| `app/_layout.tsx` | Layout (not a route) |

---

## Run on Android

> Requires Android Studio + emulator or USB-connected device.

```bash
npx expo start       # then press 'a'
npx expo start --android          # direct
npx expo run:android              # local build
npx expo run:android --device     # physical device
```

---

## Run on iOS

> macOS only. Requires Xcode.

```bash
npx expo start       # then press 'i'
npx expo start --ios              # direct
npx expo run:ios                  # local build
npx expo run:ios --simulator "iPhone 16 Pro"
xcrun simctl list devices         # list simulators
```

---

## Run on Web

> Built-in web support — no extra setup needed.

```bash
npx expo start       # then press 'w'
npx expo start --web              # direct
npx expo export --platform web    # production build
```

---

## Expo Go vs Development Build

### What is Expo Go?

A free app from the App Store / Play Store. You scan a QR code and run your app instantly — no build needed. Great for learning and quick prototyping.

### What is a Development Build?

A custom version of Expo built specifically for your project. It supports any native npm package and behaves exactly like your production app — but with developer tools enabled.

### Key Differences

| Feature                    | Expo Go                        | Development Build           |
| -------------------------- | ------------------------------ | --------------------------- |
| Setup time                 | Instant (just install the app) | ~10–20 min first time       |
| Custom native modules      | ❌ Not supported               | ✅ Fully supported          |
| Production behaviour       | ❌ Sandbox only                | ✅ Matches production       |
| Stripe / BLE / Camera      | ❌                             | ✅                          |
| Push notifications (full)  | ❌ Limited                     | ✅ Full support             |
| TestFlight / Internal test | ❌                             | ✅                          |
| App size                   | Larger (all Expo modules)      | Smaller (only what you use) |
| Best for                   | Prototyping / learning         | Real app development        |

> **Rule of thumb:** Start with Expo Go. Switch to Development Build as soon as you need any native package (e.g. Stripe, Firebase, BLE, custom Camera).

### When to Create a New Development Build

You only need to trigger a new cloud build (e.g., `npm run build:dev:ios`) when you change the underlying **native code** (Objective-C/Java) of the app. 

**🚨 WHEN you MUST create a new build:**
- **Installing native packages:** When you install libraries that interact with the OS hardware/features (e.g., `@sentry/react-native`, `expo-updates`, `expo-camera`, `react-native-reanimated`, `expo-location`).
- **Changing native configurations:** Modifying `app.json` settings like the bundle identifier, package name, splash screen, or adding new permissions.
- **Upgrading Expo:** Upgrading to a new Expo SDK version.

**🟢 WHEN you DO NOT need a new build (just press `r` to reload):**
- **Writing UI and Logic:** Creating new React components, screens, styling, or hooks.
- **Installing pure JavaScript packages:** Libraries without native dependencies (e.g., `lodash`, `axios`, `date-fns`, `redux`).

---

## Convert to Development Build

### ✅ Progress — What's Done

| Status | Step | Detail |
|---|---|---|
| ✅ Done | `expo-dev-client` installed | Added to `package.json` |
| ✅ Done | `eas.json` created | development · staging · production profiles |
| ✅ Done | `app.json` updated | `bundleIdentifier` + `package` name added |
| ✅ Done | npm scripts added | All build/start/submit scripts in `package.json` |
| ✅ Done | `eas login` | Logged in as `DarshanRana` |
| ✅ Done | `eas init` | Project: `@darshanrana/ExpoStructure` · ID: `1454ab29-793f-4dd3-8692-7d5ba0c5668e` |
| 🔄 Running | Android dev build | `npm run build:dev:android` |
| ⏳ Pending | iOS dev build | `npm run build:dev:ios` |
| ⏳ Pending | Install build on device | Download & install `.apk` / `.ipa` |
| ⏳ Pending | Start dev-client server | `npm run start:dev` |

---

### Steps Detail

#### Step 1 — Install EAS CLI ✅
```bash
npm install -g eas-cli
```

#### Step 2 — Install expo-dev-client ✅
```bash
npx expo install expo-dev-client
```

#### Step 3 — Create eas.json ✅
File `eas.json` created with development, staging, production profiles.

#### Step 4 — Update app.json ✅
Added `bundleIdentifier` (iOS) and `package` (Android) to `app.json`.

#### Step 5 — Add npm scripts ✅
All build, start, and submit scripts added to `package.json`.

#### Step 6 — Login to Expo ✅
```bash
eas login
# Logged in as: DarshanRana
```

#### Step 7 — Link project to Expo ✅
```bash
eas init
# Project: @darshanrana/ExpoStructure
# Project ID: 1454ab29-793f-4dd3-8692-7d5ba0c5668e
```

#### Step 8 — Build development app 🔄
```bash
# Android (currently running)
npm run build:dev:android

# iOS Simulator (No Apple Developer Account needed!)
npm run build:dev:ios-sim

# iOS Physical Device (Requires paid Apple Developer Account)
eas device:create
npm run build:dev:ios

# Both at once (requires paid Apple Developer Account for iOS)
npm run build:dev:all
```
> ☁️ Builds run on EAS cloud servers. Takes ~10–20 min. You'll get a download link when done.

#### Step 9 — Install the build on your device ⏳
- **Android** → Download `.apk` from the EAS link → Install on your device
- **iOS** → Download `.ipa` from the EAS link → Install via Expo dashboard

#### Step 10 — Start the dev server ⏳
```bash
npm run start:dev
```
> Open the installed development build app → it auto-connects to your Metro server.

#### Step 3 — Register your iOS device (iOS only, first time)

```bash
eas device:create
# Follow the printed URL to register your device UDID
```

#### Step 4 — Build the development app

```bash
# Android
npm run build:dev:android

# iOS Simulator (No Apple Developer Account needed!)
npm run build:dev:ios-sim

# iOS Physical Device (Requires paid Apple Developer Account)
npm run build:dev:ios

# Both at once (requires paid Apple Developer Account for iOS)
npm run build:dev:all
```

> ☁️ Builds run on EAS cloud servers. Takes ~10–20 min. You'll get a download link when done.

#### Step 5 — Install the build on your device

- **Android** → Download `.apk` from the EAS link → Install on your device
- **iOS** → Download `.ipa` from the EAS link → Install via Expo dashboard

#### Step 6 — Start the dev server

```bash
npm run start:dev
```

> Open the installed development build app → it auto-connects to your Metro server.

---

### Current `eas.json` (already set up)

```json
{
  "cli": {
    "version": ">= 16.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "development-simulator": {
      "developmentClient": true,
      "ios": {
        "simulator": true
      }
    },
    "staging": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### npm Scripts Reference

#### Start
| Script | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run start:clear` | Start with cache cleared |
| `npm run start:dev` | Start with dev-client |
| `npm run start:tunnel` | Start with tunnel (physical devices) |
| `npm run start:lan` | Start on LAN |

#### Run Platform
| Script | Description |
|---|---|
| `npm run android` | Open Android emulator |
| `npm run ios` | Open iOS simulator |
| `npm run web` | Open in browser |

#### Build (EAS Cloud)
| Script | Platform | Purpose |
|---|---|---|
| `npm run build:dev:android` | Android | Development build |
| `npm run build:dev:ios` | iOS | Development build (Physical Device - paid Apple Dev Account req.) |
| `npm run build:dev:ios-sim` | iOS | Development build (Simulator - Free) |
| `npm run build:dev:all` | Both | Development build |
| `npm run build:staging:android` | Android | Staging / QA build |
| `npm run build:staging:ios` | iOS | Staging / QA build |
| `npm run build:prod:android` | Android | Production build |
| `npm run build:prod:ios` | iOS | Production build |
| `npm run build:web` | Web | Export static web build |

#### Submit to Stores
| Script | Description |
|---|---|
| `npm run submit:android` | Submit to Google Play Store |
| `npm run submit:ios` | Submit to Apple App Store |

#### Utilities
| Script | Description |
|---|---|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run doctor` | Check project health |
| `npm run reset-project` | Reset to blank template |

---

### Local Build (No EAS Cloud)

Build directly on your machine without EAS:

```bash
# Android (requires Android Studio)
npx expo run:android

# iOS (requires Xcode, macOS only)
npx expo run:ios
```

> This generates `android/` and `ios/` folders in your project (like React Native CLI).

---

## Tools & Features

| Tool | Purpose | How it's Used |
|---|---|---|
| **CI/CD (GitHub Actions)** | Automated Pipelines | Automatically runs security scans, test coverage, and semantic release when code is pushed or a PR is created. |
| **EAS (Expo Application Services)** | Cloud Builds | Handles compiling the app into native Android (`.apk`/`.aab`) and iOS (`.ipa`) binaries in the cloud. |
| **Husky** | Git Hooks Manager | Intercepts `git commit` commands to automatically run `lint-staged` and `commitlint` before saving the commit. |
| **Lint-Staged** | Fast Linting | Runs ESLint and Prettier *only* on the files you are currently trying to commit, keeping pre-commit checks fast. |
| **Prettier & ESLint** | Formatting & Linting | Enforces consistent code style and catches programmatic errors before code is pushed. |
| **Commitlint** | Commit Enforcement | Forces developers to use Conventional Commits (e.g., `feat:`, `fix:`) so that Semantic Release can understand the history. |
| **Semantic Release** | Automated Versioning | Analyzes commit messages, automatically bumps versions, creates changelogs, and tags releases without human intervention. |
| **Maestro** | End-to-End Testing | A simple, declarative UI testing framework. It simulates a real user tapping and typing through the app. |
| **Jest** | Unit Testing | Framework for writing unit tests to ensure individual functions and components work correctly. |
| **TruffleHog** | Security Scanning | A GitHub Action that scans every commit for accidentally leaked API keys, tokens, or passwords. |

---

## NPM Install vs CI

When managing dependencies, it is important to know when to use `npm install` versus `npm ci`.

### `npm install` (Use for Local Development)
- **When to use:** When you are working on your computer locally, or when you are adding/updating a new package.
- **What it does:** It looks at `package.json`, installs the packages, and if a newer version of a minor/patch package exists (based on the `^` or `~` symbols), it might install that newer version. It will then **update** your `package-lock.json` file.

### `npm ci` (Use for CI/CD and Onboarding)
*(CI stands for Continuous Integration)*
- **When to use:** In GitHub Actions, Bitbucket Pipelines, or when a new developer joins the team and wants a 100% perfectly clean setup ("onboarding").
- **What it does:** It completely deletes your existing `node_modules` folder. It bypasses `package.json` entirely and reads strictly from `package-lock.json`. It will **never** update `package-lock.json` or bump version numbers.

**Summary:** 
- In **GitHub Actions / Pipelines:** Always use `npm ci`.
- When **onboarding** (cloning the repo for the first time): `npm ci` is best, as it guarantees you match the team perfectly.
- When **developing locally** (day-to-day): Use `npm install`.

---

## Troubleshooting

```bash
# Clear Expo cache
npx expo start --clear

# Kill port 8081
lsof -ti:8081 | xargs kill -9

# Reverse port (Android physical device)
adb reverse tcp:8081 tcp:8081

# Reset node_modules
rm -rf node_modules && npm install

# Clear watchman
watchman watch-del-all

# Reset to blank template
npm run reset-project
```

**Dev Server keyboard shortcuts:**

| Key | Action       |
| --- | ------------ |
| `a` | Open Android |
| `i` | Open iOS     |
| `w` | Open Web     |
| `r` | Reload       |
| `m` | Dev menu     |
| `j` | Debugger     |
