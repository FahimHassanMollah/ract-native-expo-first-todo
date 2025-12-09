import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
