import { TextInput, View, Pressable } from "react-native";
import { useSignUp, useClerk } from "@clerk/clerk-expo";
import { useAuth as useRealmAuth } from "@realm/react";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { isValidUsername } from "../utils/ValidUsername";
import { Form, Input, YStack, Text, Button, XStack } from "tamagui";
import { orange, purple } from "@tamagui/themes";

const register = () => {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { logInWithJWT } = useRealmAuth();
  const clerk = useClerk();

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHaveAccountPress = () => {
    router.push("login");
  };
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
      const token = await clerk.session?.getToken({ template: "Atlas" });

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
    <YStack overflow="hidden" flex={1} backgroundColor={orange.orange1}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <Form onSubmit={onSignUpPress}>
            <YStack alignItems="center" paddingTop="$8" space="$1">
              <Input
                autoCapitalize="none"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
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
                  Create an account
                </Button>
              </Form.Trigger>
            </YStack>
          </Form>
          <XStack alignSelf="center">
            <Text fontFamily="$body">Have an account? </Text>
            <Text
              fontFamily="Inter_600SemiBold"
              color={purple.purple9}
              onPress={handleHaveAccountPress}
            >
              Log in
            </Text>
          </XStack>
        </>
      )}

      {pendingVerification && (
        <>
          <Form onSubmit={onPressVerify}>
            <YStack alignItems="center" paddingTop="$8" space="$1">
              <Text
                marginVertical="$4"
                marginHorizontal="$6"
                fontFamily="Inter_500Medium"
                fontSize={24}
              >
                We have sent a verification code to your email!
              </Text>
              <Input
                autoCapitalize="none"
                placeholder="Verification Code"
                value={code}
                onChangeText={setCode}
                size="$4"
                marginVertical="$2"
                fontFamily="Inter_500Medium"
                fontSize={15}
                borderRadius={0}
                backgroundColor="transparent"
                borderColor="transparent"
                borderBottomColor="rgb(214, 211, 209)"
                width="83.333333%"
                maxLength={6}
              />
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
                  Verify my account
                </Button>
              </Form.Trigger>
            </YStack>
          </Form>
        </>
      )}
    </YStack>
  );
};

export default register;
