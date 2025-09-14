import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("You must provide a location name");
  }
  const data = await state.pokeAPI.fetchLocation(args[0]);
  console.log(`Exploring ${args[0]}...`);
  console.log("Found Pokemon:");
  data.pokemon_encounters.forEach((result) =>
    console.log(` - ${result.pokemon.name}`)
  );
  state.readline.prompt();
}
