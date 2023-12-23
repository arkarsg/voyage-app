import { View, Text } from 'react-native'
import React from 'react'
import { useQuery, useRealm } from '@realm/react';
import { Group } from '../models/Group';

const Page = () => {
  const realm = useRealm();
  // get the groups
  const groups = useQuery(Group);

  return (
    <View className="space-y-4 flex-1 items-center justify-center">
        <Text>Groups</Text>
        <Text>{JSON.stringify(groups, null, 2)}</Text>
    </View>
  );
}

export default Page