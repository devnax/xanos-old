import fs from "fs";
import { XANOS_BUILD_DIR } from "../helpers.js";

const dynamicImport = async () => {
  const appsDir = process.cwd() + "/apps";
  if (fs.existsSync(appsDir)) {
    try {
      const files = fs.readdirSync(appsDir);
      files.forEach((file) => {
        const stats = fs.statSync(`${appsDir}/${file}`);
        if (stats.isDirectory()) {
          const files = fs.readdirSync(`${appsDir}/${file}`);
          const appRequirements = {
            client: null,
            server: null,
          };
          if (files.includes("client.ts")) {
            appRequirements.client = "client.ts";
          } else if (files.includes("client.js")) {
            appRequirements.client = "client.js";
          }
          if (files.includes("server.ts")) {
            appRequirements.server = "server.ts";
          } else if (files.includes("server.js")) {
            appRequirements.server = "server.js";
          }

          if (appRequirements.client && appRequirements.server) {
            console.log(file);
          }
        }
      });
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }
};

export default dynamicImport;
