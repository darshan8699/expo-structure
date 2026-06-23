# 📚 ExpoStructure — Documentation

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Project](#create-project)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [Run on Android](#run-on-android)
6. [Run on iOS](#run-on-ios)
7. [Run on Web](#run-on-web)
8. [Development Build](#development-build)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | >= 18 | JavaScript runtime |
| EAS CLI | Latest | Cloud builds |
| Android Studio | Latest | Android emulator |
| Xcode | Latest | iOS simulator (macOS only) |
| Expo Go | Latest | Run on physical device |

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
git clone https://github.com/darshan8699/RN_Basic_Structure.git
cd RN_Basic_Structure/ExpoStructure

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

| File | Route |
|---|---|
| `app/index.tsx` | `/` |
| `app/explore.tsx` | `/explore` |
| `app/[id].tsx` | `/123` (dynamic) |
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

## Development Build

Upgrade from Expo Go to a custom dev build with full native module support.

```bash
# 1. Login to Expo
eas login

# 2. Link project
eas init

# 3. Configure EAS
eas build:configure

# 4. Install dev-client
npx expo install expo-dev-client

# 5. Build
eas build --profile development --platform android
eas build --profile development --platform ios

# 6. Register iOS device (first time)
eas device:create

# 7. Start with dev-client
npx expo start --dev-client
```

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

| Key | Action |
|---|---|
| `a` | Open Android |
| `i` | Open iOS |
| `w` | Open Web |
| `r` | Reload |
| `m` | Dev menu |
| `j` | Debugger |
