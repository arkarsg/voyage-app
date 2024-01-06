import { purple, orange } from "@tamagui/colors";
import { ListItem, YGroup } from "tamagui";
import { Feather } from "@expo/vector-icons";
import CustomSeparator from "./CustomSeparator";

type AccountCardProps = {
  name: string;
  email: string;
};

const AccountCard = ({ name, email }: AccountCardProps) => {
  return (
    <YGroup separator={<CustomSeparator />} marginHorizontal="$2.5">
      <YGroup.Item>
        <ListItem
          backgroundColor={orange.orange1}
          title="Username"
          subTitle={name}
          size="$4"
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          backgroundColor={orange.orange1}
          title="E-mail"
          subTitle={email}
          size="$4"
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          backgroundColor={orange.orange1}
          title="Edit profile"
          size="$4"
          pressTheme
          iconAfter={({ color, size }) => (
            <Feather name="chevron-right" color={color} size={size} />
          )}
        />
      </YGroup.Item>
    </YGroup>
  );
};

export default AccountCard;
