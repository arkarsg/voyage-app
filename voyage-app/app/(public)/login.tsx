import {
  useSignIn,
  useAuth as useClerkAuth,
  useClerk,
} from "@clerk/clerk-expo";
import { useAuth as useRealmAuth } from "@realm/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Pressable, Text, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const login = () => {
  const router = useRouter();
  const { logInWithJWT, result } = useRealmAuth();
  const { getToken, isSignedIn } = useClerkAuth();
  const clerk = useClerk();

  const handleCreateAccountPress = () => {
    router.push("register");
  };

  const handleResetPress = () => {
    router.push("reset");
  };

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      // token from Clerk
      const token = await getToken({ template: "Atlas" });
      // authenticate to Realm
      if (token) {
        try {
          logInWithJWT(token);
        } catch (err) {
          console.log("🛑 Error logging into Realm", err);
        }
      } else {
        console.log("🛑 Could not get token from Clerk");
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="h-full w-full flex bg-stone-100">
      <Spinner visible={loading} />
      <View className="flex items-center space-y-8 pt-32">
        {/* Email text input */}
        <View className="space-y-2 w-full items-center">
          <View className="justify-around items-left border-b border-stone-300 w-10/12">
            <TextInput
              autoCapitalize="none"
              placeholder="E-mail"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={{
                marginVertical: 15,
                fontFamily: "IBMPlexSans_500Medium",
                fontSize: 15,
              }}
            />
          </View>
          {/* Password input */}
          <View className="justify-around items-left border-b border-stone-300 w-10/12">
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                marginVertical: 15,
                fontFamily: "IBMPlexSans_500Medium",
                fontSize: 15,
              }}
            />
          </View>

          <Pressable
            className="flex items-end p-3 justify-end space-y-5 ml-60"
            onPress={handleResetPress}
          >
            <Text
              style={{
                fontFamily: "IBMPlexSans_400Regular",
              }}
              className="text-voyage-blue tracking-tightest text-m"
            >
              Forgot password?
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={onSignInPress}
          className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
        >
          <Text
            style={{
              fontFamily: "IBMPlexSans_500Medium",
            }}
            className="text-zinc-100 text-lg"
          >
            Log in
          </Text>
        </Pressable>
      </View>

      <View className="justify-center flex-row items-center m-5">
        <Text
          style={{
            fontFamily: "IBMPlexSans_400Regular",
          }}
          className="text-zinc-700 text-m"
        >
          Don't have an account?{" "}
        </Text>
        <Pressable onPress={handleCreateAccountPress}>
          <Text
            style={{
              fontFamily: "IBMPlexSans_400Regular",
            }}
            className="text-voyage-blue text-m"
          >
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default login;
