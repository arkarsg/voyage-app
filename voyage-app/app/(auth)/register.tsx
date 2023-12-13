import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { isValidEmail } from "./utils/ValidEmail";
import { isValidUsername } from "./utils/ValidUsername";
import { isStrongPassword } from "./utils/PasswordStrength";

const register = () => {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="h-full w-full flex bg-stone-100">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <View className="flex items-center space-y-5 pt-32">
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
              <View className="justify-around items-left border-b border-stone-300 w-10/12">
                <TextInput
                  autoCapitalize="none"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={{
                    marginVertical: 15,
                    fontFamily: "IBMPlexSans_500Medium",
                    fontSize: 15,
                  }}
                />
              </View>
              <View className="justify-around items-left border-b border-stone-300 w-10/12 mb-6">
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
                onPress={onSignUpPress}
                className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-zinc-100 text-lg"
                >
                  Join
                </Text>
              </Pressable>
            </View>
            <View className="justify-center flex-row items-center">
              <Text
                style={{
                  fontFamily: "IBMPlexSans_400Regular",
                }}
                className="text-zinc-700 text-m"
              >
                Have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text
                    style={{
                      fontFamily: "IBMPlexSans_400Regular",
                    }}
                    className="text-voyage-blue text-m"
                  >
                    Log in
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </>
      )}

      {pendingVerification && (
        <>
          <View className="flex items-center space-y-5 pt-32">
            <View className="space-y-2 w-full items-center">
              <View className="space-y-2 w-10/12 m-5">
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_600SemiBold",
                  }}
                  className="text-zinc-700 text-2xl"
                >
                  Just one more step...
                </Text>
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-zinc-700 text-m"
                >
                  We have sent a verification code to your e-mail!{"\n"}Paste
                  the code below
                </Text>
              </View>
              <View className="justify-around items-left border-b border-stone-300 w-10/12 mb-6">
                <TextInput
                  autoCapitalize="none"
                  placeholder="Verification code"
                  value={code}
                  onChangeText={setCode}
                  style={{
                    marginVertical: 15,
                    fontFamily: "IBMPlexSans_500Medium",
                    fontSize: 15,
                  }}
                />
              </View>
              <Pressable
                onPress={onPressVerify}
                className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-zinc-100 text-lg"
                >
                  Verify account
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default register;
