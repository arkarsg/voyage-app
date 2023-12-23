import React, { useEffect, useState } from "react";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";

// Clerk imports
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

// MongoDB Atlas Realm imports
import Realm, {
  ClientResetMode,
  OpenRealmBehaviorType,
  SyncError,
} from "realm";
import { RealmProvider, AppProvider, UserProvider, useApp } from "@realm/react";
import { AuthResultBoundary } from "./components/AuthResultBoundary";
import { logger } from "./utils/logger";

// Styles
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

// Object models
import { Task } from "./models/Task";
import { schemas } from "./models";
import { User } from "./models/User";
import { Group } from "./models/Group";
import { Invite } from "./models/Invite";

export { ErrorBoundary } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const appId = process.env.EXPO_PUBLIC_ATLAS_APP_ID!;

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

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

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
      router.replace("/budget");
    } else if (!isSignedIn || !isRealmLoggedIn) {
      router.replace("/welcome");
    }
  }, [isSignedIn]);

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
  const [colorMode, setColorMode] = React.useState<"dark" | "light">("light");
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
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

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <AppProvider id={appId}>
            <AuthResultBoundary>
              <UserProvider fallback={InitialLayout}>
                <RealmProvider
                  schema={schemas}
                  sync={{
                    flexible: true,
                    initialSubscriptions: {
                      update: (mutableSubs, realm) => {
                        mutableSubs.add(realm.objects(User));
                        mutableSubs.add(realm.objects(Group));
                      },
                    },
                    newRealmFileBehavior: {
                      type: OpenRealmBehaviorType.DownloadBeforeOpen,
                    },
                    existingRealmFileBehavior: {
                      type: OpenRealmBehaviorType.OpenImmediately,
                    },
                    clientReset: {
                      mode: ClientResetMode.DiscardUnsyncedChanges,
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
      </ThemeContext.Provider>
    </GluestackUIProvider>
  );
}
