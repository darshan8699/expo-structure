// Config — app-wide configuration values
// Load from environment variables in production using expo-constants or react-native-config

const Config = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.example.com/v1",
  APP_NAME: "ExpoStructure",
  APP_VERSION: "1.0.0",
  TIMEOUT_MS: 10_000,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? "",
  ENABLE_LOGS: __DEV__,
};

export default Config;
