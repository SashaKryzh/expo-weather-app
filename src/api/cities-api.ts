import { CitySearchResponse } from '@/types/cities';

const baseUrl = 'https://api.teleport.org/api';

export async function searchCitiesByName(name: string) {
  const response = await fetch(`${baseUrl}/cities/?search=${name}`);
  const data = await response.json();
  return data as CitySearchResponse;
}
