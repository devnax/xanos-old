import { XANOS_DIR, XANOS_BUILD_DIR, spawn, execSync } from "../helpers.js";
import dynamicImport from "../inc/dynamicImport.js";
import esbuild from "esbuild";

const serve = async (opt) => {
  if (opt.port) {
    process.env.PORT = opt.port;
  }

  // dynamicImport();

  // return;
  execSync(`rm -rf ${XANOS_BUILD_DIR}`);

  esbuild.buildSync({
    entryPoints: [`${XANOS_DIR}/server/**/*.js`],
    outdir: `${XANOS_BUILD_DIR}/server`,
    format: "esm",
    platform: "node",
  });

  esbuild.buildSync({
    entryPoints: [`${XANOS_DIR}/client/**/*.js`],
    outdir: `${XANOS_BUILD_DIR}/client`,
    format: "esm",
    platform: "node",
  });

  spawn("node", [`${XANOS_BUILD_DIR}/server/server.dev.js`]);

  //load config file
  // watch apps dir
};

export default serve;
