import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SignedOut } from "@clerk/clerk-expo";
import { Button, H1, Stack, Text, YStack } from "tamagui";
import { orange, purple } from "@tamagui/themes";

const AuthPage = () => {
  const router = useRouter();

  const handleLogInPress = () => {
    router.push("login");
  };

  const handleSignUpPress = () => {
    router.push("register");
  };

  return (
    <SignedOut>
      <YStack
        overflow="hidden"
        flex={1}
        backgroundColor={orange.orange1}
        alignItems="center"
      >
        <Text
          flex={1}
          alignItems="center"
          fontFamily=" Inter_700Bold"
          col={purple.purple9}
          marginVertical="$10"
          paddingTop="$20"
          fontSize={64}
        >
          Voyage
        </Text>
        <Stack alignItems="center" width="100%" marginVertical="$10">
          <Button
            size="$4"
            theme="purple"
            borderRadius="$12"
            width="83.333333%"
            fontFamily="Inter_500Medium"
            fontSize={15}
            marginVertical="$2"
            onPress={handleLogInPress}
          >
            Log in
          </Button>
          <Button
            size="$4"
            theme="dark"
            borderRadius="$12"
            width="83.333333%"
            fontFamily="Inter_500Medium"
            fontSize={15}
            marginVertical="$2"
            onPress={handleSignUpPress}
          >
            Sign up
          </Button>
        </Stack>
      </YStack>
    </SignedOut>
  );
};

export default AuthPage;
