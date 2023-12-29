import { execSync } from "child_process";
import fs from "fs";
import esbuild from "esbuild";
const packageDir = "./";

const _exec = (command) => {
  try {
    execSync(command);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const buildPackage = async () => {
  // _exec(`npx tsdx build --entry ./client/main.tsx`);
  // _exec(`npx tsc -p ./tsconfig.json --outDir ${packageDir}`);

  esbuild.build({
    entryPoints: ["src/client/main.tsx"],
    outfile: "client/client.js",
    bundle: true,
    format: "esm",
  });

  esbuild.build({
    entryPoints: ["src/server/server.ts"],
    outdir: "server",
    bundle: true,
    format: "cjs",
    platform: "node",
    external: ["vite"],
  });
  return;

  try {
    let filePath = `${packageDir}/server/server.dev.js`;
    let data = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePath, data.replace("main.tsx", "main.js"), "utf8");

    filePath = `${packageDir}/server/server.js`;
    data = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePath, data.replace("main.tsx", "main.js"), "utf8");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

buildPackage();
