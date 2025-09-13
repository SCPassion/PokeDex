import { CLICommand } from "./state.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`);
  }
}
