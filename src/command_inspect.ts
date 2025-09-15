import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    console.log("You must provide a pokemon name");
    state.readline.prompt();
    return;
  }
  const pokemonName = args[0];
  if (!state.pokedex[pokemonName]) {
    console.log("you have not caught that pokemon");
    state.readline.prompt();
    return;
  }
  const pokemon = state.pokedex[pokemonName];

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log(`Stats:`);
  pokemon.stats.forEach((stat) => {
    console.log(` - ${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log(`Types:`);
  pokemon.types.forEach((type) => {
    console.log(` - ${type.type.name}`);
  });

  state.readline.prompt();
}
