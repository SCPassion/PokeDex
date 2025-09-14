import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays locations in the Pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous locations in the Pokemon world",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a location",
      callback: commandExplore,
    },
    // catch: {
    //   name: "catch",
    //   description: "Catch a Pokemon",
    //   callback: commandCatch,
    // },
  };
}
