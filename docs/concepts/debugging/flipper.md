# Flipper Native Debugging

Flipper is a desktop debugging platform developed by Meta for inspecting native iOS and Android apps. It integrates both native and React Native debugging plug-ins.

> [!IMPORTANT]
> **Expo SDK 56 deprecation notice:**
> In modern React Native (SDK 56+), Flipper is deprecated and disabled by default due to issues with startup times, build size, and reliability. Expo now recommends using **Chrome DevTools (or Safari Web Inspector) for JS debugging** alongside the built-in React DevTools and network inspection in Expo CLI.
> However, understanding Flipper remains important for legacy compatibility and native device debugging.

---

## Dependencies
In custom development builds with Flipper enabled:
```bash
# Install Flipper middleware package
npm install --save-dev react-native-flipper
```

---

## Flipper Client-Server Connection Architecture

```mermaid
graph TD
    App[React Native Application] -->|Native socket / ADB| FlipperDesktop[Flipper Desktop App]
    FlipperDesktop -->|Layout inspector plugin| UI[Native UI view controller]
    FlipperDesktop -->|Network plugin| Net[Http calls axios/fetch]
```

---

## Realistic Example: Tracing a Network Payload Failure

This sequence explains how developers diagnose a failed API request inside debugging console inspectors.

```mermaid
sequenceDiagram
    participant User as App Interface
    participant Network as Network Service (fetch)
    participant Console as Hermes Console Log
    participant NetworkTab as Flipper Network Plugin

    User->>Network: Submits login request
    Network->>NetworkTab: Trigger fetch POST /login
    Note over NetworkTab: Request status: Pending...
    Network-->>User: Server returns 401 Unauthorized
    Network->>NetworkTab: Update status: 401 (Failed)
    Network->>Console: console.error('Authentication check failed')
    Note over Console: Developer logs appear in red inside Console Panel
    Note over NetworkTab: Developer clicks payload -> Inspects headers & server message
```
