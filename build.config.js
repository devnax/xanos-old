import { exec, execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = "./package";

const _exec = (command) => {
  try {
    const result = execSync(command);
    console.log(result.toString("utf8"));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const buildPackage = async () => {
  _exec(`rm -rf ${packageDir}`);
  _exec(`npx tsc -p ./tsconfig.json --outDir ${packageDir}`);
  _exec(`cp -r "./src/bin" "${packageDir}"`);
  _exec(`cp "./package.json" "${packageDir}/package.json"`);
  try {
    let filePath = `${packageDir}/server.dev.js`;
    const data = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePath, data.replace("main.tsx", "main.js"), "utf8");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

buildPackage();
