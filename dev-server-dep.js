import { execSync } from "child_process";
import { spawn } from "./bin/helpers.js";
import chokidar from "chokidar";
import esbuild from "esbuild";
import fs from "fs";

try {
  execSync("rm -rf ./server");
  execSync("rm -rf ./client");
} catch (error) {}

const watcher = chokidar.watch("./src", {
  ignoreInitial: false,
  ignored: /(node_modules|\.git|\.+\.|[^.]+\.+(?!ts|tsx$)[^.]+$)/,
});

let started;
let chokidarReady = false;
let startServer = () => {
  if (!chokidarReady) return;
  if (started) started.kill();
  started = spawn("node", ["./server/server.dev.js"]);
};

watcher.on("ready", () => {
  chokidarReady = true;
  startServer();
});

watcher.on("all", (event, path) => {
  let outfile = path.split("/");
  outfile.shift();
  outfile = outfile.join("/");
  outfile = outfile.replace(".ts", ".js");
  outfile = outfile.replace(".tsx", ".jsx");
  const isServer = path.startsWith("src/server");

  switch (event) {
    case "change":
    case "add":
      esbuild.buildSync({
        entryPoints: [path],
        outfile,
      });
      break;
    case "unlink":
      fs.unlinkSync(outfile);
      break;
  }

  if (isServer && (event === "unlink" || event === "change")) {
    startServer();
  }
});
