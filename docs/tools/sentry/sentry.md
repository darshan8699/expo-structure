# 🛡️ Sentry — Error Monitoring & Performance

---

## 📋 Table of Contents

1. [What is Sentry?](#what-is-sentry)
2. [How Sentry Works](#how-sentry-works)
3. [Current Implementation](#current-implementation)
4. [Setup & Configuration](#setup--configuration)
5. [API Reference](#api-reference)
6. [Usage in Asthma Australia App](#usage-in-asthma-australia-app)
7. [EAS Build Integration](#eas-build-integration)
8. [EAS Update Integration](#eas-update-integration)
9. [Sentry Dashboard](#sentry-dashboard)
10. [Best Practices](#best-practices)

---

## What is Sentry?

**Sentry** is an open-source **Application Performance Monitoring (APM) and Error Tracking** platform used in production apps worldwide.

It automatically captures crashes, exceptions, network failures, and slow transactions from live users — and sends them to a real-time dashboard where you can diagnose and fix issues before they affect more users.

> Think of it as the **black box recorder** for your app. When something goes wrong in production, Sentry tells you exactly what happened, who was affected, and where in the code it broke — with the full stack trace (not minified).

### What Sentry Captures Automatically

| Signal | Description |
|---|---|
| **JS Crashes** | Unhandled exceptions, unhandled promise rejections |
| **Native Crashes** | iOS / Android native crashes via Hermes / JSC symbolication |
| **React Errors** | Component render errors (via Error Boundary) |
| **Slow Transactions** | Screen load time, navigation duration, API response time |
| **Network Failures** | HTTP 4xx / 5xx responses (opt-in) |
| **Breadcrumbs** | Automatic trail of actions the user took before a crash |

### Key Features

| Feature | What It Does |
|---|---|
| **Error Tracking** | Groups similar errors, shows frequency and affected users |
| **Performance Monitoring** | p50/p95 screen load times, API durations, frame rates |
| **Release Tracking** | Ties errors to a specific app version or EAS Update |
| **User Context** | Attach user ID, email, and name to every event |
| **Breadcrumbs** | Auto-recorded trail of navigation, taps, and network calls |
| **Source Maps** | Shows exact original line of code (not minified bundle) |
| **Screenshots** | Attaches a screenshot of the screen at time of crash |
| **View Hierarchy** | Attaches the UI component tree to every crash report |
| **Alerts** | Slack / Email alerts when error rate spikes |
| **Environments** | Separate dashboards for dev / staging / production |
| **Session Replays** | (Web) Records what user did before crash |
| **EAS Dashboard** | View Sentry crash reports directly inside Expo dashboard |

---

## How Sentry Works

```
User opens app
      ↓
Sentry SDK initialises (module-level, before first render)
      ↓
SDK wraps app with React Error Boundary
      ↓
User navigates, taps, makes API calls
      ↓ (SDK records each action as a breadcrumb)
Something crashes / throws / times out
      ↓
SDK captures: stack trace + breadcrumbs + device info + user context + screenshot
      ↓ (batched, async, offline-queued — no blocking)
Sentry.io cloud dashboard
      ↓
Slack / Email alert → Developer investigates → Fix deployed
```

**Offline behaviour:** If the device has no internet, Sentry queues events and sends them when connectivity is restored. No events are lost.

---

## Current Implementation

### Files

| File | Role |
|---|---|
| [`src/services/sentry/index.ts`](../src/services/sentry/index.ts) | Sentry initialisation + helper functions |
| [`src/app/_layout.tsx`](../src/app/_layout.tsx) | `initSentry()` called + `wrap()` applied to root component |
| [`src/config/index.ts`](../src/config/index.ts) | `SENTRY_DSN` loaded from environment variable |
| [`metro.config.js`](../metro.config.js) | `withSentryConfig` for source map bundling |
| [`app.json`](../app.json) | `@sentry/react-native` plugin for EAS Build source maps |
| [`.env`](./../.env) | `EXPO_PUBLIC_SENTRY_DSN` — paste your DSN here |

### Installed Packages

```json
"@sentry/react-native": "^x.x.x",
"expo-updates": "^x.x.x"
```

### `src/services/sentry/index.ts` — Exported API

```typescript
initSentry()                     // call once at app start
setSentryUser(user | null)       // set / clear user identity
captureError(error, context?)    // capture a caught exception
captureMessage(message, level?)  // capture a non-exception message
addBreadcrumb(options)           // add a manual breadcrumb
setGlobalTag(key, value)         // tag all future events
wrap(Component)                  // wrap root component (error boundary + perf)
Sentry                           // raw SDK for advanced use
```

### `src/app/_layout.tsx` — Root Wiring

```typescript
import { initSentry, wrap } from '@/services/sentry';

// Module-level: runs before first render
initSentry();

function RootLayout() { ... }

// wrap() adds:
// - React Error Boundary (catches render crashes)
// - Automatic navigation performance transactions
export default wrap(RootLayout);
```

### `src/config/index.ts` — DSN Config

```typescript
const Config = {
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  // ...
};
```

### `metro.config.js` — Source Maps

```javascript
const { withSentryConfig } = require("@sentry/react-native/metro");
const config = getDefaultConfig(__dirname);
module.exports = withSentryConfig(config);
```

### `app.json` — Plugin

```json
"plugins": [
  "expo-router",
  "@sentry/react-native",
  ...
]
```

The plugin automatically:
- Uploads JS source maps during `eas build`
- Configures iOS dSYMs for native crash symbolication
- Configures Android ProGuard mappings

---

## Setup & Configuration

### Step 1 — Create a Sentry Account & Project

1. Go to [sentry.io](https://sentry.io) → Sign up (free tier: 5,000 events/month)
2. Create a new project → choose **React Native**
3. Note your:
   - **DSN** — from `Settings > Client Keys (DSN)`
   - **Organization slug** — from `Organization Settings`
   - **Project name** — from `Settings > Projects`
   - **Auth token** — from `Settings > Auth Tokens` (create new)

### Step 2 — Add DSN to `.env`

```env
EXPO_PUBLIC_SENTRY_DSN=https://xxxx@o0.ingest.sentry.io/project-id
```

> `EXPO_PUBLIC_` prefix makes the value available inside the app bundle at runtime.

### Step 3 — Add Auth Token (EAS Build only)

Do **not** put `SENTRY_AUTH_TOKEN` in `.env` — it's sensitive. Add it as an EAS secret instead:

```bash
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value sntrys_xxx
```

Or set it in `eas.json` under the production build profile:

```json
{
  "build": {
    "production": {
      "env": {
        "SENTRY_AUTH_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Step 4 — Verify (Add Test Button)

In any screen during development, temporarily add:

```typescript
import { Button } from 'react-native';
import { captureError } from '@/services/sentry';

// Test button
<Button
  title="Test Sentry"
  onPress={() => { throw new Error('Sentry test crash!'); }}
/>
```

Build a release build (`eas build --profile production`) and trigger the error. You should see it appear in the Sentry dashboard within seconds.

---

## API Reference

### `initSentry()`

Call once, at module level in `_layout.tsx`, before any render.

```typescript
initSentry();
```

- Skips init silently if `SENTRY_DSN` is not set (safe for local dev)
- Disabled in `__DEV__` mode so local crashes don't pollute the dashboard
- Tags the current EAS Update ID automatically

---

### `setSentryUser(user)`

Call after successful login to attach user identity to all future events.
Call with `null` on logout to clear.

```typescript
// After login
setSentryUser({
  id: user.id,           // required
  email: user.email,     // optional
  username: user.name,   // optional
});

// After logout
setSentryUser(null);
```

---

### `captureError(error, context?)`

Use inside `try/catch` blocks to report handled exceptions.

```typescript
try {
  await someRiskyOperation();
} catch (error) {
  captureError(error, {
    tags: { feature: 'symptom-tracker', screen: 'DashboardScreen' },
    extra: { userId: user.id, payload: data },
    level: 'error',   // 'fatal' | 'error' | 'warning' | 'info' | 'debug'
  });
}
```

---

### `captureMessage(message, level?)`

For non-exception events worth tracking (unusual states, warnings).

```typescript
captureMessage('Medication reminder skipped — no permission', 'warning');
captureMessage('Offline sync completed after reconnect', 'info');
```

---

### `addBreadcrumb(options)`

Manually record an action in the event trail. Helps reconstruct what the user was doing before a crash.

```typescript
addBreadcrumb({
  category: 'symptom',
  message: 'User submitted symptom log',
  level: 'info',
  data: { severity: 'moderate', triggers: ['dust', 'exercise'] },
});
```

---

### `setGlobalTag(key, value)`

Tag all future events with a label. Useful for filtering in the dashboard.

```typescript
setGlobalTag('user-type', 'patient');
setGlobalTag('subscription', 'premium');
```

---

### `wrap(Component)`

Wraps a React component with:
- Sentry **Error Boundary** — catches render-time crashes and reports them
- **Performance transaction** — records screen load time automatically

Used on the root layout and optionally on individual screens.

```typescript
export default wrap(RootLayout);
```

---

## Usage in Asthma Australia App

Below are the specific places and patterns to use Sentry in the Asthma Australia app.

---

### 1. Auth — Set User on Login / Logout

```typescript
// screens/auth/LoginScreen.tsx
import { setSentryUser } from '@/services/sentry';

async function handleLogin(credentials: LoginInput) {
  try {
    const user = await authService.login(credentials);
    
    // Attach user to every future Sentry event
    setSentryUser({
      id: user.id,
      email: user.email,
      username: `${user.firstName} ${user.lastName}`,
    });

    router.replace('/(tabs)/dashboard');
  } catch (error) {
    captureError(error, {
      tags: { feature: 'auth', action: 'login' },
    });
    showErrorToast('Login failed. Please try again.');
  }
}

// On logout
function handleLogout() {
  setSentryUser(null);  // clear user from Sentry
  authService.logout();
}
```

---

### 2. Symptom Tracker — Capture Logging Failures

Symptom logging is a core feature. Any failure here should be immediately visible.

```typescript
// features/symptoms/SymptomLogScreen.tsx
import { captureError, addBreadcrumb } from '@/services/sentry';

async function handleSubmitSymptom(form: SymptomForm) {
  addBreadcrumb({
    category: 'symptom',
    message: 'User submitted symptom log',
    data: {
      severity: form.severity,
      triggers: form.triggers,
      timestamp: new Date().toISOString(),
    },
  });

  try {
    await symptomService.log(form);
    router.push('/symptoms/success');
  } catch (error) {
    captureError(error, {
      tags: { feature: 'symptom-tracker', action: 'log-symptom' },
      extra: { formData: form },
      level: 'error',
    });
    showErrorAlert('Failed to save symptom. Please try again.');
  }
}
```

---

### 3. Medication Reminders — Track Scheduling Failures

Missed reminders in a health app are serious. Capture any scheduling or delivery failure.

```typescript
// services/reminders/reminderService.ts
import { captureError, captureMessage } from '@/services/sentry';

async function scheduleReminder(medication: Medication) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time for your medication',
        body: `${medication.name} — ${medication.dose}`,
      },
      trigger: { hour: medication.time.hour, minute: medication.time.minute, repeats: true },
    });
  } catch (error) {
    captureError(error, {
      tags: { feature: 'reminders', medication: medication.name },
      extra: { medicationId: medication.id, scheduledTime: medication.time },
      level: 'error',
    });
  }
}

async function cancelAllReminders() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    // Warning only — not critical
    captureError(error, {
      tags: { feature: 'reminders', action: 'cancel-all' },
      level: 'warning',
    });
  }
}
```

---

### 4. API / GraphQL Calls — Network Failure Tracking

Capture any failed API request with enough context to reproduce it.

```typescript
// src/apis/http-requests/api.client.ts
import { captureError } from '@/services/sentry';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      const error = new Error(`API ${response.status}: ${response.statusText}`);
      captureError(error, {
        tags: { feature: 'api', method: 'GET', endpoint },
        extra: { status: response.status, url: `${BASE_URL}${endpoint}` },
        level: 'error',
      });
      throw error;
    }
    return response.json() as Promise<T>;
  },

  post: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error(`API ${response.status}: ${response.statusText}`);
      captureError(error, {
        tags: { feature: 'api', method: 'POST', endpoint },
        extra: { status: response.status, requestBody: body },
        level: 'error',
      });
      throw error;
    }
    return response.json() as Promise<T>;
  },
};
```

---

### 5. Asthma Action Plan — Critical Data Load Failure

If an action plan fails to load, the user may be left without emergency instructions.

```typescript
// features/action-plan/ActionPlanScreen.tsx
import { captureError, captureMessage, addBreadcrumb } from '@/services/sentry';

async function loadActionPlan(userId: string) {
  addBreadcrumb({
    category: 'action-plan',
    message: 'Loading asthma action plan',
    data: { userId },
  });

  try {
    const plan = await actionPlanService.fetch(userId);
    
    if (!plan) {
      // Not an error, but worth noting
      captureMessage(
        `Action plan not found for user ${userId}`,
        'warning'
      );
    }
    
    return plan;
  } catch (error) {
    // This is critical — user may need their action plan in an emergency
    captureError(error, {
      tags: { feature: 'action-plan', action: 'load', severity: 'critical' },
      extra: { userId },
      level: 'fatal',  // 'fatal' surfaces at the top of the Sentry dashboard
    });
    throw error;
  }
}
```

---

### 6. Offline Sync — Data Sync Failure

When the app comes back online after offline mode, sync failures should be tracked.

```typescript
// services/sync/syncService.ts
import { captureError, captureMessage, addBreadcrumb } from '@/services/sentry';

async function syncPendingData() {
  addBreadcrumb({
    category: 'sync',
    message: 'Starting offline data sync',
    level: 'info',
  });

  const pending = await localDB.getPendingItems();

  for (const item of pending) {
    try {
      await apiClient.post('/sync', item);
      await localDB.markSynced(item.id);
    } catch (error) {
      captureError(error, {
        tags: { feature: 'offline-sync', itemType: item.type },
        extra: { itemId: item.id, createdAt: item.createdAt },
        level: 'warning',
      });
      // Continue syncing other items — don't abort the whole batch
    }
  }

  captureMessage(`Sync completed: ${pending.length} items processed`, 'info');
}
```

---

### 7. Navigation — Screen Breadcrumbs

Track which screens the user visited before a crash — useful for reproducing edge cases.

```typescript
// src/app/_layout.tsx or a navigation hook
import { addBreadcrumb } from '@/services/sentry';

// In your navigation listener or screen-level useEffect:
useEffect(() => {
  addBreadcrumb({
    category: 'navigation',
    message: `Navigated to ${routeName}`,
    level: 'info',
    data: { route: routeName, params: routeParams },
  });
}, [routeName]);
```

---

### 8. Performance — Dashboard Load Time

Track how long the main dashboard takes to load data for real users.

```typescript
// features/dashboard/DashboardScreen.tsx
import { Sentry } from '@/services/sentry';

async function loadDashboard() {
  const transaction = Sentry.startTransaction({
    name: 'LoadAsthmaDashboard',
    op: 'screen.load',
  });

  try {
    await Promise.all([
      loadSymptomHistory(),
      loadMedications(),
      loadActionPlan(),
    ]);
    transaction.setStatus('ok');
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
}
```

---

### 9. Feature Tagging — Filter by Module

Set global tags when entering different areas of the app so you can filter Sentry events by feature.

```typescript
// When user enters a feature area:
import { setGlobalTag } from '@/services/sentry';

// In a feature layout or provider:
setGlobalTag('active-feature', 'symptom-tracker');
// or
setGlobalTag('active-feature', 'medication-log');
// or
setGlobalTag('active-feature', 'action-plan');
```

---

### Full Asthma Feature → Sentry Coverage Map

| Feature | `captureError` | `captureMessage` | `addBreadcrumb` | `setSentryUser` | Performance |
|---|:---:|:---:|:---:|:---:|:---:|
| Login / Logout | ✅ | — | ✅ | ✅ | — |
| Symptom Logging | ✅ | — | ✅ | — | — |
| Medication Reminders | ✅ | — | ✅ | — | — |
| Action Plan Load | ✅ (fatal) | ✅ | ✅ | — | — |
| API / GraphQL calls | ✅ | — | — | — | — |
| Offline Sync | ✅ | ✅ | ✅ | — | — |
| Navigation | — | — | ✅ | — | — |
| Dashboard Load | — | — | — | — | ✅ |

---

## EAS Build Integration

Source maps are automatically uploaded during every EAS build when the `SENTRY_AUTH_TOKEN` secret is set.

### Add Auth Token as EAS Secret

```bash
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value sntrys_xxx
```

### Or via `eas.json`

```json
{
  "build": {
    "production": {
      "env": {
        "SENTRY_AUTH_TOKEN": "sntrys_xxx",
        "SENTRY_ORG": "your-org-slug",
        "SENTRY_PROJECT": "your-project-name"
      }
    }
  }
}
```

With source maps uploaded, crash stack traces in Sentry will show your **original TypeScript source** instead of the minified bundle.

---

## EAS Update Integration

After running `eas update`, upload source maps so OTA update crashes are also symbolicated:

```bash
# Publish update and upload source maps in one step
eas update --branch production && npx sentry-expo-upload-sourcemaps dist
```

The current implementation automatically tags each event with the active EAS Update ID:

```typescript
// Done automatically inside initSentry() → _tagExpoUpdate()
scope.setTag('expo-update-id', Updates.updateId ?? 'embedded');
scope.setTag('expo-is-embedded-update', String(Updates.isEmbeddedLaunch));
```

This means you can filter Sentry events by OTA update in the dashboard — e.g. "show all errors that appeared after update v2.3.1".

---

## Sentry Dashboard

### Issues Tab
- Lists all grouped errors sorted by frequency
- Click any issue → see full stack trace + breadcrumbs + user context + screenshot

### Performance Tab
- p50 / p95 screen load times per route
- Slow frames, frozen frames, app startup time
- Apdex score (user satisfaction metric)

### Releases Tab
- Crash-free session percentage per app version
- Regression detection — alerts if a new version has more errors

### Alerts Tab
- Set thresholds like: "alert me if error rate > 1% in the last 5 minutes"
- Deliver via Slack, email, PagerDuty, etc.

---

## Best Practices

### ✅ Do

- Call `initSentry()` at module level (before first render) — not inside a component
- Always call `setSentryUser()` right after login and `setSentryUser(null)` on logout
- Use `level: 'fatal'` for errors that block core health features (action plan, reminders)
- Add `addBreadcrumb()` before any critical user action so you have context in crash reports
- Use `tags` for filterable labels (`feature`, `screen`, `action`) and `extra` for raw data
- Keep `SENTRY_AUTH_TOKEN` out of `.env` — use EAS secrets only
- Keep `enabled: !__DEV__` in `Sentry.init()` — prevents local dev noise

### ❌ Don't

- Don't call `captureError` inside a Sentry Error Boundary — it will double-report
- Don't log PII (passwords, full medical records) in `extra` or `data` fields
- Don't use `level: 'fatal'` for routine API errors — reserve it for truly critical failures
- Don't set `tracesSampleRate: 1.0` in production unless you're on a paid plan — it's expensive
- Don't call `initSentry()` more than once

### Severity Level Guide

| Level | When to Use |
|---|---|
| `fatal` | App is unusable; core feature is completely broken (e.g. action plan won't load) |
| `error` | Feature failed but app continues (e.g. symptom save failed) |
| `warning` | Unusual state, degraded behaviour (e.g. reminder permission denied) |
| `info` | Noteworthy event, not a problem (e.g. sync completed, offline mode entered) |
| `debug` | Verbose diagnostic — almost never needed in Sentry (use logs instead) |

---

## Free Tier Limits (sentry.io)

| Plan | Error Events/month | Performance Units | Data Retention |
|---|---|---|---|
| **Free** (Developer) | 5,000 | 10,000 | 30 days |
| **Team** | 50,000+ | 100,000+ | 90 days |
| **Business** | Unlimited | Unlimited | 90 days |

The free tier is sufficient for development and early production (< ~500 active users).
