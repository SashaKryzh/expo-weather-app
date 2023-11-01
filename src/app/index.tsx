import { getForecast } from '@/api/weather-api';
import { WeatherDayCard } from '@/components/WeatherDayCard';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, ScrollView, Text, View, YStack } from 'tamagui';

export default function Page() {
  const { data, error } = useQuery({
    queryKey: ['currentWeather', { city: 'London' }],
    queryFn: () => getForecast({ city: 'London' }),
  });

  return (
    <YStack fullscreen backgroundColor={'$blue3Dark'}>
      <Stack.Screen
        options={{
          title: data?.location.name,
          navigationBarColor: '$blue3Dark',
        }}
      />
      <YStack flex={1} padding={5} alignItems='center'>
        <YStack flex={1} justifyContent='center' alignItems='center'>
          {data && (
            <Text fontSize={'$16'} color={'white'}>
              {data.current.temp_c}
            </Text>
          )}
          <H2 color={'white'}>{data?.current.condition.text}</H2>
        </YStack>
        <ScrollView
          flexGrow={0}
          minWidth={'100%'}
          horizontal
          showsHorizontalScrollIndicator={false}
          space='$4'
          paddingHorizontal={'$3'}
          paddingVertical={'$2'}
        >
          {data &&
            data.forecast.forecastday
              .slice(1)
              .map((day) => (
                <WeatherDayCard
                  key={day.date_epoch}
                  temperature={day.day.avgtemp_c}
                  date={day.date}
                />
              ))}
          <View width={'$0.75'} />
        </ScrollView>
      </YStack>
      <View>
        <SafeAreaView edges={['bottom']}>
          <YStack padding='$4' space='$2'>
            <Link href='/search' asChild>
              <Button>Search city</Button>
            </Link>
            <Button>Show my current location</Button>
          </YStack>
        </SafeAreaView>
      </View>
    </YStack>
  );
}
