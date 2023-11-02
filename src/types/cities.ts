export interface CityItemLinks {
  'city:item': {
    href: string;
  };
}

export interface AlternateName {
  name: string;
}

export interface CitySearchResult {
  _links: CityItemLinks;
  matching_alternate_names: AlternateName[];
  matching_full_name: string;
}

export interface SearchResultLinks {
  self: {
    href: string;
  };
}

export interface CitySearchResponse {
  _embedded: {
    'city:search-results': CitySearchResult[];
  };
  _links: SearchResultLinks;
  count: number;
}
