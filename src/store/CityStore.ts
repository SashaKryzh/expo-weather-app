import { CitySearchResult } from '@/types/cities';
import { makeAutoObservable } from 'mobx';

class CityStore {
  city = 'London';

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: CitySearchResult) {
    this.city = city.matching_full_name;
  }
}

export const cityStore = new CityStore();
