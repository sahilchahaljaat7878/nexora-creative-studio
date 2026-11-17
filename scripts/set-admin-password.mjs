/**
 * Set (or change) the admin panel credentials.
 *
 * Usage:
 *   npm run admin:password                 -> asks for the values interactively
 *   npm run admin:password sahil sahil7878 -> sets them directly
 *
 * The password is stored as a scrypt hash (never in plain text).
 */
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { writeCredentials } from "../server/auth.mjs";

const [, , usernameArg, passwordArg] = process.argv;

async function ask(question, { hidden = false } = {}) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  if (!hidden) {
    const answer = await rl.question(question);
    rl.close();
    return answer.trim();
  }
  stdout.write(question);
  rl.output.write = () => {};
  const answer = await rl.question("");
  rl.close();
  stdout.write("\n");
  return answer.trim();
}

const username = usernameArg || (await ask("Admin username (default: sahil): ")) || "sahil";
const password = passwordArg || (await ask("Admin password: ", { hidden: true }));

if (!password || password.length < 6) {
  console.error("Password must be at least 6 characters.");
  process.exit(1);
}

await writeCredentials(username, password);
console.log(`\nAdmin credentials saved for "${username}".`);
console.log("Sign in at /admin on the running site.");
