# 📚 ReactNativeCliStructure — Documentation

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Project](#create-project)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [Run on Android](#run-on-android)
6. [Run on iOS](#run-on-ios)
7. [Run on Web](#run-on-web)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | >= 22.11.0 | JavaScript runtime |
| JDK | 17 | Android builds |
| Xcode | Latest | iOS builds (macOS only) |
| Android Studio | Latest | Android emulator |
| CocoaPods | Latest | iOS dependency manager |

```bash
# Install Watchman (macOS)
brew install watchman

# Install CocoaPods (macOS)
sudo gem install cocoapods

# Install JDK 17 (Android)
brew install --cask zulu@17
```

---

## Create Project

```bash
# Create new project
npx @react-native-community/cli@latest init MyAppName

# Navigate into project
cd MyAppName

# Install iOS dependencies (macOS only)
bundle install
bundle exec pod install
```

---

## Installation

```bash
# Clone repo
git clone https://github.com/darshan8699/RN_Basic_Structure.git
cd RN_Basic_Structure/ReactNativeCliStructure

# Install dependencies
npm install

# iOS only
bundle install
bundle exec pod install
```

---

## Folder Structure

```
src/
├── assets/
│   ├── fonts/              # Custom fonts (.ttf)
│   ├── images/             # Images (.png, .svg)
│   └── others/             # Lottie, videos
├── common/
│   ├── constants.ts        # App-wide constants
│   ├── data.ts             # Static data
│   ├── fonts.ts            # Font name constants
│   ├── images.ts           # Image path exports
│   └── strings.ts          # UI text strings
├── context/
│   └── AuthProvider.tsx    # Auth context & state
├── hooks/
│   ├── useBackHandler.ts   # Android back press
│   ├── useKeyboardState.ts # Keyboard show/hide
│   └── useResources.ts     # Asset preloading
├── navigation/
│   ├── NavigationContainer.ts
│   ├── NavigationService.ts
│   └── Routes/
│       ├── AppStack.ts     # Authenticated routes
│       ├── AuthStack.ts    # Unauthenticated routes
│       └── index.ts        # Route name constants
├── screens/
│   └── Auth/
│       ├── Login/          # index.tsx + styles.ts
│       └── Register/       # index.tsx + styles.ts
├── services/
│   ├── UserApi.ts          # User API calls
│   ├── apis.ts             # Axios instance
│   ├── requestInterceptor.ts
│   ├── responseInterceptor.ts
│   └── urls.ts             # API endpoints
├── theme/
│   ├── colors.ts           # Color palette
│   ├── globalStyle.ts      # Shared styles
│   └── typography.ts       # Font sizes & families
└── utils/
    ├── environment.ts      # .env variables
    ├── globalState.ts      # Global mutable state
    ├── helper.ts           # Utility functions
    ├── metrics.ts          # Screen dimensions
    ├── storage.ts          # AsyncStorage wrapper
    └── validation.ts       # Form validation
```

---

## Run on Android

> Requires Android Studio + emulator running or USB-connected device.

```bash
# Start Metro
npm start

# Run on Android (new terminal)
npm run android

# Specific device
npx react-native run-android --deviceId <device-id>

# List devices
adb devices

# Reverse port (physical device)
adb reverse tcp:8081 tcp:8081

# Release mode
npx react-native run-android --mode=release
```

---

## Run on iOS

> macOS only. Requires Xcode.

```bash
# Start Metro
npm start

# Run on iOS (new terminal)
npm run ios

# Specific simulator
npx react-native run-ios --simulator="iPhone 16 Pro"

# List simulators
xcrun simctl list devices

# Release mode
npx react-native run-ios --configuration Release
```

---

## Run on Web

> React Native CLI has no built-in web support. Use React Native Web:

```bash
npm install react-native-web react-dom
```

> 💡 For full web support, use the **ExpoStructure** template instead.

---

## Troubleshooting

```bash
# Clear Metro cache
npm start -- --reset-cache

# Kill port 8081
lsof -ti:8081 | xargs kill -9

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build
cd ios && xcodebuild clean && cd ..
bundle exec pod install

# Reset node_modules
rm -rf node_modules && npm install

# Fix pods
cd ios && pod deintegrate && pod install && cd ..
```
