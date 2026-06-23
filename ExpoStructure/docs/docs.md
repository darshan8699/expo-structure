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
8. [Expo Go vs Development Build](#expo-go-vs-development-build)
9. [Convert to Development Build](#convert-to-development-build)
10. [Troubleshooting](#troubleshooting)

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

## Expo Go vs Development Build

### What is Expo Go?
A free app from the App Store / Play Store. You scan a QR code and run your app instantly — no build needed. Great for learning and quick prototyping.

### What is a Development Build?
A custom version of Expo built specifically for your project. It supports any native npm package and behaves exactly like your production app — but with developer tools enabled.

### Key Differences

| Feature | Expo Go | Development Build |
|---|---|---|
| Setup time | Instant (just install the app) | ~10–20 min first time |
| Custom native modules | ❌ Not supported | ✅ Fully supported |
| Production behaviour | ❌ Sandbox only | ✅ Matches production |
| Stripe / BLE / Camera | ❌ | ✅ |
| Push notifications (full) | ❌ Limited | ✅ Full support |
| TestFlight / Internal test | ❌ | ✅ |
| App size | Larger (all Expo modules) | Smaller (only what you use) |
| Best for | Prototyping / learning | Real app development |

> **Rule of thumb:** Start with Expo Go. Switch to Development Build as soon as you need any native package (e.g. Stripe, Firebase, BLE, custom Camera).

---

## Convert to Development Build

Follow these steps in order. Do them once per project.

### Step 1 — Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2 — Create a free Expo account
Go to [expo.dev](https://expo.dev) → Sign Up (free)

### Step 3 — Login via terminal
```bash
eas login
# Enter your Expo email and password
```

### Step 4 — Link your project to Expo
```bash
eas init
# This adds a projectId to your app.json automatically
```

### Step 5 — Configure EAS build
```bash
eas build:configure
# Creates eas.json in your project root
```

Your `eas.json` will look like this:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Step 6 — Install expo-dev-client
```bash
npx expo install expo-dev-client
```

### Step 7 — Register your iOS device (iOS only, first time)
```bash
eas device:create
# Follow the link shown to register your device UDID
```

### Step 8 — Build the development app
```bash
# Android
eas build --profile development --platform android

# iOS
eas build --profile development --platform ios

# Both at once
eas build --profile development --platform all
```
> ☁️ Builds run on EAS cloud servers. Takes ~10–20 min. You'll get a download link when done.

### Step 9 — Install the build on your device
- **Android** → Download the `.apk` from the link → Install it on your device
- **iOS** → Download the `.ipa` from the link → Install via the Expo dashboard

### Step 10 — Start the dev server with dev-client
```bash
npx expo start --dev-client
```
Open the installed development build app on your device → it connects to your Metro server automatically.

---

### Local Build (No EAS Cloud)

If you prefer to build locally on your machine instead of using EAS cloud:

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

| Key | Action |
|---|---|
| `a` | Open Android |
| `i` | Open iOS |
| `w` | Open Web |
| `r` | Reload |
| `m` | Dev menu |
| `j` | Debugger |
