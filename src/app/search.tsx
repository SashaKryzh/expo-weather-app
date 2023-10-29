import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Input, SizableText, YStack } from 'tamagui';

export default function Page() {
  const inputViewId = 'inputViewId';

  return (
    <ScrollView>
      <YStack padding={4}>
        <Stack.Screen
          options={{
            title: 'Search',
          }}
        />
        <SizableText>Search page</SizableText>
        <YStack height='$2' />
        <Input placeholder='Search' inputAccessoryViewID={inputViewId} />
      </YStack>
    </ScrollView>
  );
}
