import React from "react";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";
import { orange } from "@tamagui/colors";

function PublicLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{ headerTitle: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Sign up",
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          headerTitleStyle: {
            fontFamily: "Inter_600SemiBold",
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
        name="login"
        options={{
          headerTitle: "Log in",
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          headerTitleStyle: {
            fontFamily: "Inter_600SemiBold",
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
        name="reset"
        options={{
          headerTitle: "Reset password",
          headerTintColor: "#f5f5f4",
          headerTitleStyle: {
            fontFamily: "Inter_600SemiBold",
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
    </Stack>
  );
}

export default PublicLayout;
