import {
  CurrentWeather,
  WeatherAlerts,
  WeatherForecast,
  WeatherLocation,
} from '@/types/weather';

interface CityParam {
  city: string;
}

interface CurrentWeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
}

export async function getCurrentWeather({ city }: CityParam) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/current.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${city}&aqi=no`
  );
  const data = await response.json();
  return data as CurrentWeatherResponse;
}

interface ForecastResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: WeatherForecast;
  alerts: WeatherAlerts;
}

export async function getForecast({ city }: CityParam) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${city}&days=4&aqi=no&alerts=no`
  );
  const data = await response.json();
  return data as ForecastResponse;
}
