import fs from "fs";

const root = "./modules";
try {
  const clientImports = [];
  const serverImports = [];
  const serverFns = [];
  const files = fs.readdirSync(root);
  files.forEach(async (dir) => {
    const moduleDir = `${root}/${dir}`;
    if (fs.existsSync(`${moduleDir}/index.tsx`)) {
      clientImports.push(`import "../../modules/${dir}"`);
    }
    if (fs.existsSync(`${moduleDir}/server.ts`)) {
      serverImports.push(
        `import * as ${dir} from "../../modules/${dir}/server"`
      );
      serverFns.push(`
        if((${dir} as any).router){
            app.use("/${dir.toLowerCase()}", (${dir} as any).router)
        }
        `);
    }
  });
  if (clientImports.length) {
    fs.writeFileSync(`./core/dynamic/client.tsx`, clientImports.join("\n"));
  }
  if (serverImports.length) {
    fs.writeFileSync(
      `./core/dynamic/server.ts`,
      `
import {Express} from 'express'
${serverImports.join("\n")}
const dynamicModule = (app: Express) => {${serverFns.join("")}}
export default dynamicModule
    `
    );
  }
} catch (err) {
  console.error("Error reading directory:", err);
}
