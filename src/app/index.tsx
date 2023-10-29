import { Link, Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Button, Text, YStack } from 'tamagui';

export default function Page() {
  return (
    <ScrollView>
      <YStack padding={5}>
        <Stack.Screen
          options={{
            title: 'Home',
          }}
        />
        <YStack height='$4' />
        <Text>Open up App.tsx to start working on your app!</Text>
        <YStack height='$2' />
        <Link href='/search' asChild>
          <Button variant='outlined'>Search page</Button>
        </Link>
      </YStack>
    </ScrollView>
  );
}
