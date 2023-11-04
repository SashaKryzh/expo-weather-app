import { searchCitiesByName } from '@/api/cities-api';
import { cityStore } from '@/store/CityStore';
import { CitySearchResult } from '@/types/cities';
import { useQuery } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, ScrollView, SizableText, View, YStack } from 'tamagui';

export default function Page() {
  const [query, setQuery] = React.useState('');

  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCitiesByName(query),
    placeholderData: (data) => data,
  });

  const cities = data?._embedded['city:search-results'];

  const onCitySelected = (city: CitySearchResult) => {
    cityStore.setCity(city);
    router.back();
  };

  return (
    <YStack fullscreen bg={'$blue6Dark'}>
      <StatusBar style='light' />
      <Stack.Screen
        options={{
          title: 'Search',
          headerBackTitle: 'Weather',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
      <ScrollView padding={4} bg={'$blue6Dark'}>
        {cities &&
          cities.map((city, index) => (
            <TouchableOpacity
              key={city.matching_full_name + index}
              onPress={() => onCitySelected(city)}
              style={{ backgroundColor: '' }}
            >
              <SizableText
                paddingHorizontal='$3'
                paddingVertical='$2'
                color={'white'}
              >
                {city.matching_full_name}
              </SizableText>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View padding={'$3'} bc={'$blue3Dark'}>
          <SafeAreaView edges={['bottom']}>
            <Input
              placeholder='Search'
              value={query}
              onChangeText={(text) => setQuery(text)}
              backgroundColor={'$blue5Dark'}
              borderWidth={0}
              col={'white'}
              keyboardAppearance='dark'
              autoFocus
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </YStack>
  );
}
