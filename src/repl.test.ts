import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "hello world",
    expected: ["hello", "world"],
  },
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello\t world",
    expected: ["hello", "world"],
  },
  {
    input: "hello\n world",
    expected: ["hello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const results = cleanInput(input);
    results.forEach((result, index) => {
      expect(result).toBe(expected[index]);
    });
  });
});
