import React, { useEffect, useState } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { RealmProvider } from "@realm/react";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

import {
  useFonts,
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/dev";
import { Button } from "react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    IBMPlexSans_100Thin,
    IBMPlexSans_100Thin_Italic,
    IBMPlexSans_200ExtraLight,
    IBMPlexSans_200ExtraLight_Italic,
    IBMPlexSans_300Light,
    IBMPlexSans_300Light_Italic,
    IBMPlexSans_400Regular,
    IBMPlexSans_400Regular_Italic,
    IBMPlexSans_500Medium,
    IBMPlexSans_500Medium_Italic,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_600SemiBold_Italic,
    IBMPlexSans_700Bold,
    IBMPlexSans_700Bold_Italic,
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{
          headerTitle: "Sign up with Google",
          headerTitleStyle: {
            fontFamily: "IBMPlexSans_500Medium",
          },
          presentation: "modal",
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          headerTitle: "Log in",
          headerTintColor: "#f5f5f4",
          headerTitleStyle: {
            fontFamily: "IBMPlexSans_500Medium",
            color: "#27272a",
          },
          presentation: "modal",
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
