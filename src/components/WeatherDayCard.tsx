import { SizableText, View, YStack, ZStack } from 'tamagui';
import { CurrentWeather, WeatherDayForecast } from '@/types/weather';

export interface WeatherDayCardProps {
  temperature: number;
  date: string;
}

export const WeatherDayCard: React.FC<WeatherDayCardProps> = (props) => {
  return (
    <View
      position='relative'
      borderWidth
      borderColor={'white'}
      borderRadius={'$5'}
    >
      <View
        position='absolute'
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundColor={'white'}
        opacity={0.05}
      />
      <YStack
        alignSelf='center'
        alignItems='center'
        paddingHorizontal={'$5'}
        paddingVertical={'$7'}
      >
        <SizableText size={'$12'} color={'white'}>
          {props.temperature.toFixed(0)}
        </SizableText>
        <SizableText size={'$8'} color={'white'}>
          {props.date}
        </SizableText>
      </YStack>
    </View>
  );
};
