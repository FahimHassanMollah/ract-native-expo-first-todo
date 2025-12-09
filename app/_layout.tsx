import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StatusBar } from "react-native";
import useTheme, { ThemeProvider } from "@/hooks/useTheme";

function ThemedApp() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar barStyle={colors.statusBarStyle} /> 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </ConvexProvider>
  );
}
