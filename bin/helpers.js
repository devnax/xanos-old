import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const XANOS_DIR = path.resolve(__dirname, "../");

export const excute = (command, args) => {
  const _spawn = spawn(command, args);
  _spawn.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  _spawn.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  _spawn.on("close", (code) => {
    console.log(`Exit code ${code}`);
  });

  _spawn.on("error", (err) => {
    console.error("Failed to start server:", err);
  });
  return _spawn;
};
