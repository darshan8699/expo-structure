import { Stack } from "expo-router";
import { initSentry, wrap } from "@/services/sentry";

// Initialise Sentry as early as possible (module-level, before first render)
initSentry();

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

// Wrapping with Sentry adds:
// - React error boundary (catches render crashes)
// - Automatic screen-load performance transactions
export default wrap(RootLayout);
