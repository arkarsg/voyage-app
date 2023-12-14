import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Page = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <View className="space-y-4 flex-1 items-center justify-center">
      <Pressable onPress={doLogout}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
};

export default Page;
