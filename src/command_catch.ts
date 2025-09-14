import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("You must provide a Pokemon name");
  }
  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

  const baseExp = pokemon.base_experience || 100;
  const catchRate = Math.max(0.1, 1 - baseExp / 1000); // 10% to 90% chance

  const random = Math.random();
  if (random < catchRate) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }

  state.readline.prompt();
}
