import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __confdir = path.resolve(__dirname, "../src/config");
const __confile_path = `${process.cwd()}/xanos.config.js`;
const server_keys = ["databases"];

const writeFile = (file, data) => {
  const filepath = `${__confdir}/dynamic/${file}.config.ts`;
  const content = `export default ${JSON.stringify(data)}`;
  fs.writeFileSync(filepath, content);
};

if (fs.existsSync(__confile_path)) {
  const { default: configs } = await import(__confile_path);
  let client = {};

  for (let k in configs) {
    if (!server_keys.includes(k)) {
      client[k] = configs[k];
    }
  }

  writeFile("client", client);
  writeFile("server", configs);
}
