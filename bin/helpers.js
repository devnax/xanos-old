import path from "path";
import { fileURLToPath } from "url";
import child_process from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const XANOS_DIR = path.resolve(__dirname, "../");
export const XANOS_BUILD_DIR = process.cwd() + "/.xanos";
export const APPS_DIR = process.cwd() + "/apps";

export const exec = (command) => {
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return;
    }
    console.log(stdout.toString());
    console.error("stderr:", stderr);
  });
};

export const execSync = (command) => {
  try {
    const result = child_process.execSync(command, {
      encoding: "utf-8",
    });
    console.log(result);
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
  }
};

export const spawnSync = (command, args) => {
  try {
    const result = child_process.spawnSync(command, args, {
      encoding: "utf-8",
      stdio: "pipe",
    });

    if (result.error) {
      throw result.error;
    }

    console.log(result.stdout);
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
  }
};

export const spawn = (command, args) => {
  const _spawn = child_process.spawn(command, args);
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
