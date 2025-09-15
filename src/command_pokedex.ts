import { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]) {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("you have not caught any pokemon");
    state.readline.prompt();
    return;
  }

  console.log("Your Pokedex:");

  Object.values(state.pokedex).forEach((pokemon) => {
    console.log(` - ${pokemon.name}`);
  });

  state.readline.prompt();
}
