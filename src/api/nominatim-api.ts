type Location = {
  lat: number;
  lng: number;
};

export async function reverseGeocodeLocationAsync(location: Location) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=jsonv2`,
    {
      headers: {
        'accept-language': 'en-US',
      },
    }
  );
  const data = await response.json();
  return data as OSMResponse;
}

interface OSMAddress {
  city?: string;
  country: string;
  country_code: string;
  neighbourhood?: string;
  postcode?: string;
  railway?: string;
  road?: string;
  state?: string;
}

interface OSMResponse {
  address: OSMAddress;
  addresstype: string;
  boundingbox: string[];
  category: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}
