import readline from "readline";
import { getCommands } from "./commands.js";

function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((str) => str.trim().toLowerCase())
    .filter((str) => str.length > 0);
}

function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt(); // Print the prompt

  rl.on("line", (input) => {
    const args = cleanInput(input);

    if (args.length === 0) {
      rl.prompt();
      return;
    }

    // console.log(`Your command was: ${args[0]}`);
    const commandName = args[0];
    const commands = getCommands();
    const command = commands[commandName];

    if (!command) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }

    try {
      command.callback(commands);
    } catch (error) {
      console.error(`Error: ${error}`);
    }

    rl.prompt();
  });
}

export { cleanInput, startREPL };
