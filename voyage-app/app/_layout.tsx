import React, { useEffect } from "react";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import {
  useFonts,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/dev";
import { AuthPage } from "./(public)/welcome";
import { RealmProvider, AppProvider, UserProvider } from "@realm/react";
import { OpenRealmBehaviorType } from "realm";
import { schemas } from "./models";
import { Task } from "./models/Task";
import {SYNC_CONFIG} from '../sync.config';

export { ErrorBoundary } from "expo-router";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export const unstable_settings = {
  initialRouteName: "/",
};

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  // Clerk consts
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  // Fonts
  const [fontsLoaded, fontError] = useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_400Regular_Italic,
    IBMPlexSans_500Medium,
    IBMPlexSans_500Medium_Italic,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_600SemiBold_Italic,
    IBMPlexSans_700Bold,
    IBMPlexSans_700Bold_Italic,
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

  useEffect(() => {
    if (!isLoaded) return;

    const isInTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !isInTabsGroup) {
      router.replace("/overview");
    } else if (!isSignedIn) {
      router.replace("/welcome");
    }
  }, [isSignedIn]);

  if (!fontsLoaded) {
    return <Slot />;
  }

  return <Slot />;
};

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

const appId = SYNC_CONFIG.appId;

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AppProvider id={appId}>
        <UserProvider fallback={<AuthPage />}>
          <RealmProvider
            schema={schemas}
            sync={{
              flexible: true,
              initialSubscriptions: {
                update: (mutableSubs, realm) =>
                  mutableSubs.add(realm.objects(Task), { name: "myTasks" }),
              },
              newRealmFileBehavior: {
                type: OpenRealmBehaviorType.DownloadBeforeOpen,
              },
              existingRealmFileBehavior: {
                type: OpenRealmBehaviorType.OpenImmediately,
              },
            }}
          >
            <InitialLayout />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
