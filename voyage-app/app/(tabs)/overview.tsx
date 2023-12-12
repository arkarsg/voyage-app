import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Link href={'/'}>Log out</Link>
      <Link href={'/items/2020'}>item</Link>
    </View>
  )
}

export default Page