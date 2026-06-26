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
10. [Developer Tooling](#developer-tooling)
11. [CI/CD & GitHub Actions](#cicd--github-actions)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool           | Version | Purpose                    |
| -------------- | ------- | -------------------------- |
| Node.js        | 24      | JavaScript runtime         |
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

---

## Convert to Development Build

### ✅ Progress — What's Done

| Status     | Step                        | Detail                                                                             |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------- |
| ✅ Done    | `expo-dev-client` installed | Added to `package.json`                                                            |
| ✅ Done    | `eas.json` created          | development · staging · production profiles                                        |
| ✅ Done    | `app.json` updated          | `bundleIdentifier` + `package` name added                                          |
| ✅ Done    | npm scripts added           | All build/start/submit scripts in `package.json`                                   |
| ✅ Done    | `eas login`                 | Logged in as `DarshanRana`                                                         |
| ✅ Done    | `eas init`                  | Project: `@darshanrana/ExpoStructure` · ID: `1454ab29-793f-4dd3-8692-7d5ba0c5668e` |
| 🔄 Running | Android dev build           | `npm run build:dev:android`                                                        |
| ⏳ Pending | iOS dev build               | `npm run build:dev:ios`                                                            |
| ⏳ Pending | Install build on device     | Download & install `.apk` / `.ipa`                                                 |
| ⏳ Pending | Start dev-client server     | `npm run start:dev`                                                                |

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

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm start`            | Start Expo dev server                |
| `npm run start:clear`  | Start with cache cleared             |
| `npm run start:dev`    | Start with dev-client                |
| `npm run start:tunnel` | Start with tunnel (physical devices) |
| `npm run start:lan`    | Start on LAN                         |

#### Run Platform

| Script            | Description           |
| ----------------- | --------------------- |
| `npm run android` | Open Android emulator |
| `npm run ios`     | Open iOS simulator    |
| `npm run web`     | Open in browser       |

#### Build (EAS Cloud)

| Script                          | Platform | Purpose                                                           |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| `npm run build:dev:android`     | Android  | Development build                                                 |
| `npm run build:dev:ios`         | iOS      | Development build (Physical Device - paid Apple Dev Account req.) |
| `npm run build:dev:ios-sim`     | iOS      | Development build (Simulator - Free)                              |
| `npm run build:dev:all`         | Both     | Development build                                                 |
| `npm run build:staging:android` | Android  | Staging / QA build                                                |
| `npm run build:staging:ios`     | iOS      | Staging / QA build                                                |
| `npm run build:prod:android`    | Android  | Production build                                                  |
| `npm run build:prod:ios`        | iOS      | Production build                                                  |
| `npm run build:web`             | Web      | Export static web build                                           |

#### Submit to Stores

| Script                   | Description                 |
| ------------------------ | --------------------------- |
| `npm run submit:android` | Submit to Google Play Store |
| `npm run submit:ios`     | Submit to Apple App Store   |

#### Utilities

| Script                  | Description             |
| ----------------------- | ----------------------- |
| `npm run lint`          | Run ESLint              |
| `npm run lint:fix`      | Auto-fix lint errors    |
| `npm run doctor`        | Check project health    |
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

---

## Developer Tooling

This project uses the same developer tooling as production apps — code formatting, conventional commits, automated versioning, and security scanning.

### Prettier

Automatic code formatting on every commit. Config in [`.prettierrc.json`](../.prettierrc.json).

```bash
npm run format          # Format all src files
npm run format:check    # Check formatting (used in CI)
```

**Rules:** no semicolons · single quotes · 120 char width · 4-space indent for TS/JS.

---

### Commitlint — Conventional Commits

Every commit message must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec. Enforced via the `commit-msg` husky hook.

| Type        | When to use                            |
| ----------- | -------------------------------------- |
| `feat:`     | New feature                            |
| `fix:`      | Bug fix                                |
| `chore:`    | Tooling, config, dependency changes    |
| `docs:`     | Documentation only                     |
| `refactor:` | Code change without feature or bug fix |
| `test:`     | Adding or updating tests               |
| `ci:`       | CI/CD changes                          |

```bash
# ✅ Good
git commit -m "feat: add login screen"
git commit -m "fix: resolve null crash on startup"
git commit -m "chore: update dependencies"

# ❌ Rejected
git commit -m "some changes"
git commit -m "wip"
```

> Add `[skip ci]` anywhere in the commit body to skip CI pipelines (used by semantic-release automated commits).

---

### lint-staged

The `pre-commit` hook runs lint-staged — it only processes **staged files**, not the entire codebase. This makes commits fast.

Staged `.ts`/`.tsx` files automatically get:

1. `expo lint --fix` — auto-fix ESLint issues
2. `prettier --write` — auto-format code

Config in [`.lintstagedrc.json`](../.lintstagedrc.json).

---

### Semantic Release

Automated versioning and changelog generation based on commit history. Runs on every push to `main`.

**How it works:**

- Analyses commit messages since the last release
- `feat:` commits → bump **minor** version (`1.0.0` → `1.1.0`)
- `fix:` commits → bump **patch** version (`1.0.0` → `1.0.1`)
- `feat!:` or `BREAKING CHANGE:` → bump **major** version (`1.0.0` → `2.0.0`)
- Updates `package.json`, `app.json` (via `semantic-release-expo`), and generates `CHANGELOG.md`
- Creates a GitHub Release with release notes

Config in [`package.json`](../package.json) under the `"release"` key.

---

## CI/CD & GitHub Actions

Two workflow files in [`.github/workflows/`](../.github/workflows/):

### `ci.yml` — Continuous Integration & Deployment

#### What runs on every push/PR to `develop` or `main`:

| Job                | Steps                                          | Triggers             |
| ------------------ | ---------------------------------------------- | -------------------- |
| `expo-ci`          | format:check → lint → test → expo-doctor       | All pushes + PRs     |
| `test-coverage`    | jest --coverage + Codacy upload                | `develop` push only  |
| `semantic-release` | Auto version bump + CHANGELOG + GitHub Release | `main` push only     |
| `eas-build`        | EAS cloud build (Android + iOS)                | `main` push + manual |

#### What runs on `develop` push:

| Workflow | Job                                               | Runs?          |
| -------- | ------------------------------------------------- | -------------- |
| CI/CD    | `expo-ci` (format:check, lint, test, expo-doctor) | ✅ Yes         |
| CI/CD    | `test-coverage` + Codacy upload                   | ✅ Yes         |
| CI/CD    | `semantic-release`                                | ❌ `main` only |
| CI/CD    | `eas-build`                                       | ❌ `main` only |
| Security | GitLeaks secrets scan                             | ✅ Yes         |
| Security | `npm audit` (high severity)                       | ✅ Yes         |

> **Semantic release is intentionally `main`-only.** It only creates real releases when merging to production.

#### Manual trigger (workflow dispatch):

You can manually trigger EAS builds from the GitHub Actions tab with options for:

- **Build type:** `development` · `staging` · `production`
- **Platform:** `all` · `android` · `ios`

---

### `security.yml` — Security & Secrets Scan

Runs in parallel with CI on every push/PR to `develop` or `main`.

| Job         | Tool                           | What it checks                                                        |
| ----------- | ------------------------------ | --------------------------------------------------------------------- |
| `gitleaks`  | `gitleaks/gitleaks-action@v2`  | Scans git history for accidentally committed secrets/tokens/passwords |
| `npm-audit` | `npm audit --audit-level=high` | Checks dependencies for known CVE vulnerabilities                     |

> `npm audit` uses `continue-on-error: true` — it reports vulnerabilities but doesn't block CI. Fix with `npm audit fix`.

---

### GitHub Secrets Required

| Secret                 | Required for              | Where to add                     |
| ---------------------- | ------------------------- | -------------------------------- |
| `EXPO_TOKEN`           | EAS cloud builds          | GitHub repo → Settings → Secrets |
| `CODACY_PROJECT_TOKEN` | Coverage upload to Codacy | GitHub repo → Settings → Secrets |
| `GITHUB_TOKEN`         | Semantic release          | Auto-provided by GitHub Actions  |
