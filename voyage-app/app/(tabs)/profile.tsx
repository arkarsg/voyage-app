import React from "react";
import { useQuery, useUser } from "@realm/react";
import { useAuth as useRealmAuth } from "@realm/react";
import { useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { Separator, YStack, Text, Button } from "tamagui";
import { orange } from "@tamagui/colors";
import AccountCard from "../components/AccountCard";
import { UserGroupCard } from "../components/TripCard";
import { Group } from "../models/Group";
import CustomSeparator from "../components/CustomSeparator";

const Page = () => {
  const { signOut } = useClerkAuth();
  const { logOut } = useRealmAuth();

  const groups = useQuery(Group);

  const doLogout = async () => {
    logOut();
    await signOut();
  };
  // get user details
  const { profile } = useUser();

  return (
    <YStack
      overflow="hidden"
      flex={1}
      backgroundColor={orange.orange1}
      padding="$2"
    >
      <Text fontFamily="Inter_700Bold" fontSize="$7" margin="$3.5">
        Account
      </Text>
      <AccountCard name={profile.name!} email={profile.email!} />
      <CustomSeparator marginVertical="$2" />
      <Text fontFamily="Inter_700Bold" fontSize="$7" margin="$3.5">
        Trips
      </Text>
      <UserGroupCard groups={groups} />
      <CustomSeparator marginVertical="$2" />
      <Button marginVertical="$3.5" marginHorizontal="$2.5" onPress={doLogout} theme="red" pressTheme>
        <Text>Log out</Text>
      </Button>
    </YStack>
  );
};

export default Page;
