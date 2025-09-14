import { State } from "./state.js";

export async function commandMap(state: State) {
  const data = await state.pokeAPI.fetchLocations(state.nextLocationURL);
  data.results.forEach((result) => console.log(result.name));
  state.nextLocationURL = data.next;
  state.previousLocationURL = data.previous;

  // Show prompt after printing locations
  state.readline.prompt();
}

export async function commandMapBack(state: State) {
  const data = await state.pokeAPI.fetchLocations(state.previousLocationURL);
  data.results.forEach((result) => console.log(result.name));
  state.nextLocationURL = data.next;
  state.previousLocationURL = data.previous;

  // Show prompt after printing locations
  state.readline.prompt();
}
