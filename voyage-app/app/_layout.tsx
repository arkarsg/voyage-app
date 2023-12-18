import React, { useEffect, useState } from "react";
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
import { RealmProvider, AppProvider, UserProvider, useApp } from "@realm/react";
import Realm, {
  ClientResetMode,
  OpenRealmBehaviorType,
  SyncError,
} from "realm";
import { logger } from "./utils/logger";
import { AuthResultBoundary } from "./components/AuthResultBoundary";

export { ErrorBoundary } from "expo-router";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export const unstable_settings = {
  initialRouteName: "/",
};

Realm.setLogLevel("trace");
Realm.setLogger((logLevel, message) => {
  const formattedMessage = `Log level: ${logLevel} -- Log Message: ${message}`;
  if (logLevel === "error" || logLevel === "fatal") {
    logger.error(formattedMessage);
  } else if (logLevel == "debug") {
    logger.info(formattedMessage);
  }
});

function handleSyncError(
  session: Realm.App.Sync.SyncSession,
  error: SyncError
): void {
  logger.error(error);
}

function handlePreClientReset(localRealm: Realm): void {
  logger.info("Initiating client reset...");
}

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  // Clerk consts
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  
  const [isRealmLoggedIn, setRealmLoggedIn] = useState(false);
  const app = useApp();

  async function getRealmStatus() {
    try {
      const userStatus = await app.currentUser;
      if (userStatus === null) {
        return false;
      } else {
        const userStatus = await app.currentUser!.isLoggedIn;
        return userStatus;
      }
    } catch (err) {
      console.log("🛑 Failed to fetch user", err);
    }
  }
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
    getRealmStatus()
      .then((res) => {
        setRealmLoggedIn(res!);
      })
      .catch((err) => {
        console.log(err);
      });
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup && isRealmLoggedIn) {
      router.replace("/overview");
    } else if (!isSignedIn && !isRealmLoggedIn) {
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

export default function RootLayout() {
  const appId = process.env.EXPO_PUBLIC_ATLAS_APP_ID!;
  console.log(appId);
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AppProvider id={appId}>
        <AuthResultBoundary>
          <UserProvider fallback={InitialLayout}>
            <RealmProvider
              schema={[]}
              sync={{
                flexible: true,
                newRealmFileBehavior: {
                  type: OpenRealmBehaviorType.DownloadBeforeOpen,
                },
                existingRealmFileBehavior: {
                  type: OpenRealmBehaviorType.OpenImmediately,
                },
                clientReset: {
                  mode: ClientResetMode.RecoverOrDiscardUnsyncedChanges,
                  onBefore: handlePreClientReset,
                },
                onError: handleSyncError,
              }}
            >
              <InitialLayout />
            </RealmProvider>
          </UserProvider>
        </AuthResultBoundary>
      </AppProvider>
    </ClerkProvider>
  );
}
