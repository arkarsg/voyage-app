import { useSignIn, useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { useAuth as useRealmAuth } from "@realm/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

import {
  Form,
  Button,
  YStack,
  Input,
  Text,
  XStack,
} from "tamagui";
import { orange, purple } from "@tamagui/themes";

const login = () => {
  const router = useRouter();
  const { logInWithJWT } = useRealmAuth();
  const { getToken } = useClerkAuth();

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
    <YStack
      overflow="hidden"
      flex={1}
      backgroundColor={orange.orange1}
    >
      <Spinner visible={loading} />
      <Form onSubmit={onSignInPress}>
        <YStack alignItems="center" paddingTop="$8" space="$1">
          <Input
            autoCapitalize="none"
            placeholder="E-mail"
            value={emailAddress}
            onChangeText={setEmailAddress}
            size="$4"
            autoComplete="email"
            marginVertical="$2"
            fontFamily="Inter_500Medium"
            fontSize={15}
            borderRadius={0}
            backgroundColor="transparent"
            borderColor="transparent"
            borderBottomColor="rgb(214, 211, 209)"
            width="83.333333%"
          />
          <Input
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            size="$4"
            marginVertical="$2"
            fontFamily="Inter_500Medium"
            fontSize={15}
            borderRadius={0}
            backgroundColor="transparent"
            borderColor="transparent"
            borderBottomColor="rgb(214, 211, 209)"
            width="83.333333%"
          />
          <Text
            onPress={handleResetPress}
            fontFamily="$body"
            marginVertical="$2"
            marginHorizontal="$6"
            alignSelf="flex-end"
            color={purple.purple10}
          >
            Forgot Password?
          </Text>
          <Form.Trigger asChild disabled={loading === true}>
            <Button
              size="$4"
              theme="purple"
              borderRadius="$12"
              width="83.333333%"
              fontFamily="Inter_500Medium"
              fontSize={15}
              marginVertical="$4"
            >
              Log in
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
      <XStack alignSelf="center">
        <Text fontFamily="$body">Don't have an account?{" "}</Text>
        <Text fontFamily="Inter_600SemiBold" color={purple.purple9} onPress={handleCreateAccountPress}>Join</Text>
      </XStack>
    </YStack>
  );

  // return (
  //   <View className="h-full w-full flex bg-stone-100">
  //     <Spinner visible={loading} />
  //     <View className="flex items-center space-y-8 pt-32">
  //       {/* Email text input */}
  //       <View className="space-y-2 w-full items-center">
  //         <View className="justify-around items-left border-b border-stone-300 w-10/12">
  //           <TextInput
  //             autoCapitalize="none"
  //             placeholder="E-mail"
  //             value={emailAddress}
  //             onChangeText={setEmailAddress}
  //             style={{
  //               marginVertical: 15,
  //               fontFamily: "IBMPlexSans_500Medium",
  //               fontSize: 15,
  //             }}
  //           />
  //         </View>
  //         {/* Password input */}
  //         <View className="justify-around items-left border-b border-stone-300 w-10/12">
  //           <TextInput
  //             placeholder="Password"
  //             value={password}
  //             onChangeText={setPassword}
  //             secureTextEntry
  //             style={{
  //               marginVertical: 15,
  //               fontFamily: "IBMPlexSans_500Medium",
  //               fontSize: 15,
  //             }}
  //           />
  //         </View>

  //         <Pressable
  //           className="flex items-end p-3 justify-end space-y-5 ml-60"
  //           onPress={handleResetPress}
  //         >
  //           <Text
  //             style={{
  //               fontFamily: "IBMPlexSans_400Regular",
  //             }}
  //             className="text-voyage-blue tracking-tightest text-m"
  //           >
  //             Forgot password?
  //           </Text>
  //         </Pressable>
  //       </View>

  //       <Pressable
  //         onPress={onSignInPress}
  //         className="rounded-3xl w-10/12 items-center px-4 py-3 bg-voyage-blue"
  //       >
  //         <Text
  //           style={{
  //             fontFamily: "IBMPlexSans_500Medium",
  //           }}
  //           className="text-zinc-100 text-lg"
  //         >
  //           Log in
  //         </Text>
  //       </Pressable>
  //     </View>

  //     <View className="justify-center flex-row items-center m-5">
  //       <Text
  //         style={{
  //           fontFamily: "IBMPlexSans_400Regular",
  //         }}
  //         className="text-zinc-700 text-m"
  //       >
  //         Don't have an account?{" "}
  //       </Text>
  //       <Pressable onPress={handleCreateAccountPress}>
  //         <Text
  //           style={{
  //             fontFamily: "IBMPlexSans_400Regular",
  //           }}
  //           className="text-voyage-blue text-m"
  //         >
  //           Create Account
  //         </Text>
  //       </Pressable>
  //     </View>
  //   </View>
  // );
};

export default login;
