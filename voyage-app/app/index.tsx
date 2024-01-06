import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const StartPage = () => {
  return (
    <SafeAreaProvider>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    </SafeAreaProvider>
  );
};

export default StartPage;