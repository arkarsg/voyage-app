import { useSignIn } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
} from "react-native";

const reset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View className="h-full w-full flex bg-stone-100">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
      {!successfulCreation && (
        <>
          <View className="space-y-2 w-full items-center pt-32">
            <View className="justify-around items-left border-b border-stone-300 w-10/12 mb-6">
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

            <Pressable
              onPress={onRequestReset}
              className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
            >
              <Text
                style={{
                  fontFamily: "IBMPlexSans_500Medium",
                }}
                className="text-zinc-100 text-lg"
              >
                Send request email
              </Text>
            </Pressable>
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <View className="flex items-center space-y-5 pt-32">
            <View className="space-y-2 w-full items-center">
              <View className="justify-around items-left border-b border-stone-300 w-10/12">
                <TextInput
                  autoCapitalize="none"
                  placeholder="Reset code"
                  value={code}
                  onChangeText={setCode}
                  style={{
                    marginVertical: 15,
                    fontFamily: "IBMPlexSans_500Medium",
                    fontSize: 15,
                  }}
                />
              </View>
              <View className="justify-around items-left border-b border-stone-300 w-10/12 mb-6">
                <TextInput
                  autoCapitalize="none"
                  placeholder="New password"
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
                onPress={onReset}
                className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-zinc-100 text-lg"
                >
                  Reset password
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default reset;
