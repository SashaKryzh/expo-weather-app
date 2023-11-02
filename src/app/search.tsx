import { searchCitiesByName } from '@/api/cities-api';
import { CitySearchResult } from '@/types/cities';
import { useQuery } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, ScrollView, SizableText, View, YStack } from 'tamagui';

export default function Page() {
  const [query, setQuery] = React.useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCitiesByName(query),
    placeholderData: (data) => data,
  });

  const cities = data?._embedded['city:search-results'];

  const onCitySelected = (city: CitySearchResult) => {
    console.log(city);
    router.back();
  };

  return (
    <YStack flex={1}>
      <ScrollView padding={4}>
        <Stack.Screen
          options={{
            title: 'Search',
            headerBackTitle: 'Weather',
          }}
        />
        {cities &&
          cities.map((city, index) => (
            <TouchableOpacity
              key={city.matching_full_name + index}
              onPress={() => onCitySelected(city)}
            >
              <SizableText paddingHorizontal='$3' paddingVertical='$2'>
                {city.matching_full_name}
              </SizableText>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View padding={'$3'} bc={'$gray1'}>
          <SafeAreaView edges={['bottom']}>
            <Input
              placeholder='Search'
              value={query}
              onChangeText={(text) => setQuery(text)}
              autoFocus
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </YStack>
  );
}
