import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth as useClerkAuth} from "@clerk/clerk-expo";
import { useAuth as useRealmAuth } from "@realm/react";

const Page = () => {
  const { signOut } = useClerkAuth();
  const { logOut } = useRealmAuth();

  const doLogout = async () => {
    logOut()
    await signOut()
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
