import { Cache } from "./pokecache.js";

export class PokeAPI {
  private cache: Cache;

  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    const data = (await response.json()) as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data = (await response.json()) as Location;
    this.cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  // add properties here
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      encounter_details: Array<{
        chance: number;
        condition_values: Array<any>;
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }>;
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
};
