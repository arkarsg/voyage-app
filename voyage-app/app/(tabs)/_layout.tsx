import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { purple } from "@tamagui/colors";
import { orange } from "@tamagui/themes";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: purple.purple9,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 40 + insets.bottom,
          paddingTop: 10,
          borderTopWidth: 0
        },
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={70}
            style={{ position: "absolute", height: "100%", width: "100%" }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          tabBarLabel: "Overview",
          headerTitle: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          tabBarLabel: "Plan",
          headerTitle: "Plan",
          // edit
          tabBarIcon: ({ color, size }) => (
            <Feather name="edit" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          tabBarLabel: "Budget",
          headerTitle: "Budget",
          // dollar sign
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerStyle: {
            backgroundColor: orange.orange1,
          },
          tabBarLabel: "Profile",
          headerTitle: "Profile",
          // user
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
