import { State } from "./state.js";

function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((str) => str.trim().toLowerCase())
    .filter((str) => str.length > 0);
}

async function startREPL(state: State) {
  const rl = state.readline;

  rl.prompt(); // Print the prompt

  rl.on("line", async (input) => {
    const args = cleanInput(input);

    if (args.length === 0) {
      rl.prompt();
      return;
    }

    // console.log(`Your command was: ${args[0]}`);
    const commandName = args[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...args.slice(1));
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
}

export { cleanInput, startREPL };
