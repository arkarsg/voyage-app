import { ScrollView, Stack, Text } from "tamagui";
import { Group } from "../models/Group";
import { purple } from "@tamagui/colors";

type GroupsProps = {
  groups: Realm.Results<Group>;
};

export function UserGroupCard({ groups }: GroupsProps) {
  return (
    <>
      <Stack marginVertical="$1.5" paddingBottom="$2">
        {groups.isEmpty() && (
          <Stack
            alignItems="center"
            marginHorizontal="$4"
            borderWidth="$0.25"
            borderColor={purple.purple4}
            padding="$6"
            borderRadius="$6"
            space="$4"
          >
            <Text>✈️</Text>
            <Text fontFamily="$body">You are not in any trips yet!</Text>
          </Stack>
        )}
      </Stack>
    </>
  );
}
