import * as Location from 'expo-location';

export async function getLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status;
}

export async function getCurrentLocation() {
  const location = await Location.getCurrentPositionAsync({});
  return location;
}
