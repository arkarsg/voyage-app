import { useSignIn } from "@clerk/clerk-expo";
import { orange } from "@tamagui/themes";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Button, Form, Input, YStack, Text } from "tamagui";

const reset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(true);
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
    <YStack overflow="hidden" flex={1} backgroundColor={orange.orange1}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
      {!successfulCreation && (
        <>
          <Form onSubmit={onRequestReset}>
            <YStack alignItems="center" paddingTop="$8" space="$1">
              <Input
                autoCapitalize="none"
                placeholder="E-mail"
                value={emailAddress}
                onChangeText={setEmailAddress}
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

              <Form.Trigger asChild>
                <Button
                  size="$4"
                  theme="purple"
                  borderRadius="$12"
                  width="83.333333%"
                  fontFamily="Inter_500Medium"
                  fontSize={15}
                  marginVertical="$4"
                >
                  Send reset code
                </Button>
              </Form.Trigger>
            </YStack>
          </Form>
        </>
      )}

      {successfulCreation && (
        <>
          <Form onSubmit={onReset}>
            <YStack alignItems="center" paddingTop="$8" space="$1">
              <Text
                marginVertical="$4"
                marginHorizontal="$6"
                fontFamily="Inter_500Medium"
                fontSize={24}
              >
                Reset your account with the code sent to your email!
              </Text>
              <Input
                autoCapitalize="none"
                placeholder="Reset code"
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
              <Input
                autoCapitalize="none"
                placeholder="New password"
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
                maxLength={6}
              />
              <Form.Trigger asChild>
                <Button
                  size="$4"
                  theme="purple"
                  borderRadius="$12"
                  width="83.333333%"
                  fontFamily="Inter_500Medium"
                  fontSize={15}
                  marginVertical="$4"
                >
                  Reset password
                </Button>
              </Form.Trigger>
            </YStack>
          </Form>
        </>
      )}
    </YStack>
  );
};

export default reset;
