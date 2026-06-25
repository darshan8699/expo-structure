import * as Sentry from "@sentry/react-native";
import * as Updates from "expo-updates";
import Config from "@/config";

// ---------------------------------------------------------------------------
// Initialise Sentry — call once at app start (before any other code)
// ---------------------------------------------------------------------------
export function initSentry(): void {
  if (!Config.SENTRY_DSN) {
    // No DSN set — skip init (safe for local dev without a Sentry account)
    return;
  }

  Sentry.init({
    dsn: Config.SENTRY_DSN,

    // Disable in local development so noise stays out of the dashboard
    enabled: !__DEV__,

    environment: __DEV__ ? "development" : "production",

    // Send 20% of sessions as performance traces (raise in prod as needed)
    tracesSampleRate: 0.2,

    // Profile 10% of the traced transactions
    profilesSampleRate: 0.1,

    // Attach a screenshot to every crash report
    attachScreenshot: true,

    // Attach the view hierarchy to crash reports (helps locate the broken UI)
    attachViewHierarchy: true,

    debug: false,
  });

  // Tag every event with the EAS Update ID so you can correlate crashes with
  // a specific OTA update directly from the Sentry dashboard.
  _tagExpoUpdate();
}

// ---------------------------------------------------------------------------
// Internal: tag the current EAS Update
// ---------------------------------------------------------------------------
function _tagExpoUpdate(): void {
  try {
    const scope = Sentry.getGlobalScope();
    scope.setTag("expo-update-id", Updates.updateId ?? "embedded");
    scope.setTag("expo-is-embedded-update", String(Updates.isEmbeddedLaunch));
  } catch {
    // Updates module may not be available in all environments
  }
}

// ---------------------------------------------------------------------------
// User identity — call after login / logout
// ---------------------------------------------------------------------------
export function setSentryUser(
  user: {
    id: string;
    email?: string;
    username?: string;
  } | null,
): void {
  Sentry.setUser(user);
}

// ---------------------------------------------------------------------------
// Capture a caught exception (use in try/catch blocks)
// ---------------------------------------------------------------------------
export function captureError(
  error: unknown,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    level?: Sentry.SeverityLevel;
  },
): void {
  Sentry.withScope((scope) => {
    if (context?.tags) {
      Object.entries(context.tags).forEach(([k, v]) => scope.setTag(k, v));
    }
    if (context?.extra) {
      Object.entries(context.extra).forEach(([k, v]) => scope.setExtra(k, v));
    }
    if (context?.level) {
      scope.setLevel(context.level);
    }
    Sentry.captureException(error);
  });
}

// ---------------------------------------------------------------------------
// Capture a non-exception message (warnings, unusual states, etc.)
// ---------------------------------------------------------------------------
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
): void {
  Sentry.captureMessage(message, level);
}

// ---------------------------------------------------------------------------
// Add a manual breadcrumb — shows up in the trail before a crash
// ---------------------------------------------------------------------------
export function addBreadcrumb(options: {
  category: string;
  message: string;
  level?: Sentry.SeverityLevel;
  data?: Record<string, unknown>;
}): void {
  Sentry.addBreadcrumb({
    category: options.category,
    message: options.message,
    level: options.level ?? "info",
    data: options.data,
  });
}

// ---------------------------------------------------------------------------
// Tag all future events with an app-level label
// e.g. setGlobalTag('feature', 'asthma-tracker')
// ---------------------------------------------------------------------------
export function setGlobalTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}

// ---------------------------------------------------------------------------
// Wrap a React component with a Sentry error boundary + performance tracing
// Use this on the root layout component
// ---------------------------------------------------------------------------
export const wrap = Sentry.wrap;

// Re-export the full SDK for advanced usage
export { Sentry };
