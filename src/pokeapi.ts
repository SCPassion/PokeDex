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

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }
    const data = (await response.json()) as Pokemon;
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

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        platinum: {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: any;
            back_shiny: string;
            back_shiny_female: any;
            front_default: string;
            front_female: any;
            front_shiny: string;
            front_shiny_female: any;
          };
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "x-y": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: any;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: any;
        };
      };
    };
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      ability: any;
      is_hidden: boolean;
      slot: number;
    }>;
  }>;
};
