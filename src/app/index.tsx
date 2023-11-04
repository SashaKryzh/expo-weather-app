import { getForecast } from '@/api/weather-api';
import { WeatherDayCard } from '@/components/WeatherDayCard';
import { cityStore } from '@/store/CityStore';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  H2,
  ScrollView,
  SizableText,
  Text,
  View,
  YStack,
} from 'tamagui';

const Page = observer(() => {
  const city = cityStore.city;

  const { data } = useQuery({
    queryKey: ['currentWeather', { city }],
    queryFn: () => getForecast({ city: city! }),
    placeholderData: (data) => data,
    enabled: !!city,
  });

  return (
    <YStack fullscreen backgroundColor={'$blue3Dark'}>
      <StatusBar style='light' />
      <Stack.Screen
        options={{
          title: data?.location.name,
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
      <YStack flex={1}>
        <YStack flex={1} justifyContent='center' alignItems='center'>
          {data && (
            <Text fontSize={'$16'} color={'white'}>
              {data.current.temp_c}
            </Text>
          )}
          <H2 color={'white'}>{data?.current.condition.text}</H2>
        </YStack>

        <ScrollView
          horizontal
          flexGrow={0}
          showsHorizontalScrollIndicator={false}
          space='$4'
          paddingHorizontal={'$3'}
          paddingVertical={'$3'}
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
              <Button
                bg={'$blue10'}
                pressStyle={{ bg: '$blue8Dark', borderWidth: 0 }}
                color={'white'}
              >
                Search city
              </Button>
            </Link>
            <TouchableOpacity
              onPress={() => cityStore.setUserCurrentLocation()}
            >
              <SizableText
                paddingVertical={'$2'}
                color={'$blue10'}
                borderWidth={0}
                textAlign='center'
              >
                Current location
              </SizableText>
            </TouchableOpacity>
          </YStack>
        </SafeAreaView>
      </View>
    </YStack>
  );
});

export default Page;
