import { execSync } from "child_process";
import fs from "fs";
const packageDir = "./";

const _exec = (command) => {
  try {
    execSync(command);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const buildPackage = async () => {
  // _exec(`rm -rf ${packageDir}`);
  _exec(`npx tsc -p ./tsconfig.json --outDir ${packageDir}`);
  // _exec(`cp -r "./src/bin" "${packageDir}"`);
  // _exec(`cp "./package.json" "${packageDir}/package.json"`);

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
