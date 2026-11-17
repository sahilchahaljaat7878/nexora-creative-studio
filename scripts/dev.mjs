/**
 * Development runner: starts the API server and the Vite dev server together.
 * Vite proxies /api requests to the API server (see vite.config.ts).
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  { name: "api", color: "\u001b[35m", args: ["run", "server"] },
  { name: "web", color: "\u001b[36m", args: ["run", "dev:web"] },
];

const children = processes.map(({ name, color, args }) => {
  const child = spawn(npm, args, { cwd: root, stdio: ["ignore", "pipe", "pipe"], shell: true });
  const prefix = `${color}[${name}]\u001b[0m `;
  const pipe = (stream, target) => {
    let buffer = "";
    stream.on("data", (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) target.write(`${prefix}${line}\n`);
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on("exit", (code) => {
    process.stdout.write(`${prefix}exited with code ${code}\n`);
  });
  return child;
});

const stop = () => {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
