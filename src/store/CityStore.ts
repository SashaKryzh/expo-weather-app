import { reverseGeocodeLocationAsync } from '@/api/nominatim-api';
import {
  getCurrentLocation,
  getLocationPermission,
} from '@/services/location-service';
import { CitySearchResult } from '@/types/cities';
import { makeAutoObservable, runInAction } from 'mobx';

class CityStore {
  city = '';

  constructor() {
    makeAutoObservable(this);
    this.setUserCurrentLocation();
  }

  setCity(city: CitySearchResult) {
    this.city = city.matching_full_name;
  }

  async setUserCurrentLocation() {
    const status = await getLocationPermission();
    if (status === 'granted') {
      const location = await getCurrentLocation();
      const place = await reverseGeocodeLocationAsync({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      runInAction(() => {
        this.city = place.address.city ?? 'London';
      });
    }
  }
}

export const cityStore = new CityStore();
