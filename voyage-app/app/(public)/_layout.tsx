import React from "react";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

function PublicLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{ headerTitle: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="register"
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
        name="login"
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
        name="reset"
        options={{
          headerTitle: "Reset password",
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

    </Stack>
  );
}

export default PublicLayout;